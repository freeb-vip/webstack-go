/**
 * @Author: chentong
 * @Date: 2024/05/27 下午5:56
 */

package site

import (
	"context"
	"crypto/tls"
	"encoding/base64"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gocolly/colly"
	"github.com/mat/besticon/besticon"
	"github.com/pkg/errors"

	v1 "github.com/ch3nnn/webstack-go/api/v1"
	"github.com/ch3nnn/webstack-go/internal/dal/repository"
	s "github.com/ch3nnn/webstack-go/internal/service"
	"github.com/ch3nnn/webstack-go/pkg/tools"
)

// Service 层
var _ Service = (*service)(nil)

type Service interface {
	i()

	// List 站点列表
	List(ctx context.Context, req *v1.SiteListReq) (resp *v1.SiteListResp, err error)
	// Delete 删除站点
	Delete(ctx context.Context, req *v1.SiteDeleteReq) (resp *v1.SiteDeleteResp, err error)
	// Update 更新站点
	Update(ctx *gin.Context, req *v1.SiteUpdateReq) (resp *v1.SiteUpdateResp, err error)
	// BatchCreate 批量创建站点
	BatchCreate(ctx context.Context, req *v1.SiteCreateReq) (resp *v1.SiteCreateResp, err error)
	// Sync 同步站点信息
	Sync(ctx *gin.Context, req *v1.SiteSyncReq) (resp *v1.SiteSyncResp, err error)
	// Export 导出站点信息
	Export(ctx *gin.Context, req *v1.SiteExportReq) (resp *v1.SiteExportResp, err error)
}

type service struct {
	*s.Service
	siteRepository     repository.IStSiteDao
	categoryRepository repository.IStCategoryDao
}

func NewService(
	s *s.Service,
	siteRepository repository.IStSiteDao,
	categoryRepository repository.IStCategoryDao,
) Service {
	return &service{
		Service:            s,
		siteRepository:     siteRepository,
		categoryRepository: categoryRepository,
	}
}

func (s *service) i() {}

// -----------------------------------------------------------------------------------------------------------------------------------------

// tryURLWithProtocol 尝试使用不同的协议访问 URL
// 如果 HTTPS 失败，自动尝试 HTTP
func tryURLWithProtocol(url string, fetchFunc func(string) error) error {
	// 首先尝试原始 URL
	err := fetchFunc(url)
	if err == nil {
		return nil
	}

	// 如果原始 URL 是 HTTPS，尝试使用 HTTP
	if strings.HasPrefix(url, "https://") {
		httpURL := strings.Replace(url, "https://", "http://", 1)
		if err := fetchFunc(httpURL); err == nil {
			return nil
		}
	}

	// 如果 URL 没有协议前缀，先尝试 HTTPS，再尝试 HTTP
	if !strings.HasPrefix(url, "http://") && !strings.HasPrefix(url, "https://") {
		// 尝试 HTTPS
		httpsURL := "https://" + url
		if err := fetchFunc(httpsURL); err == nil {
			return nil
		}

		// 尝试 HTTP
		httpURL := "http://" + url
		if err := fetchFunc(httpURL); err == nil {
			return nil
		}
	}

	// 所有尝试都失败，返回原始错误
	return err
}

func getWebLogoIconBase64(url string) (string, error) {
	client := &http.Client{
		Timeout: 3 * time.Second,
		Transport: tools.NewHTTPTransport(&http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		}),
	}

	b := besticon.New(
		besticon.WithHTTPClient(client),
		besticon.WithLogger(besticon.NewDefaultLogger(io.Discard)), // disable verbose logging
	)

	var resultIcon *besticon.Icon
	var lastErr error

	// 使用 tryURLWithProtocol 尝试不同协议
	err := tryURLWithProtocol(url, func(tryURL string) error {
		finder := b.NewIconFinder()
		if _, err := finder.FetchIcons(tryURL); err != nil {
			lastErr = err
			return err
		}

		icon := finder.IconInSizeRange(besticon.SizeRange{Min: 16, Perfect: 64, Max: 512})
		if icon == nil {
			lastErr = errors.New("failed to fetch icons")
			return lastErr
		}

		resultIcon = icon
		return nil
	})

	if err != nil {
		return repository.DefaultFaviconBase64, lastErr
	}

	return base64.StdEncoding.EncodeToString(resultIcon.ImageData), nil
}

func getWebTitle(url string) (title string, err error) {
	var result string
	var lastErr error

	// 使用 tryURLWithProtocol 尝试不同协议
	err = tryURLWithProtocol(url, func(tryURL string) error {
		c := tools.NewColly()
		var pageTitle string
		c.OnHTML("title", func(e *colly.HTMLElement) {
			pageTitle += e.Text
		})
		if err := c.Visit(tryURL); err != nil {
			lastErr = err
			return err
		}
		result = pageTitle
		return nil
	})

	if err != nil {
		return "", lastErr
	}

	return result, nil
}

func getWebDescription(url string) (doc string, err error) {
	var result string
	var lastErr error

	// 使用 tryURLWithProtocol 尝试不同协议
	err = tryURLWithProtocol(url, func(tryURL string) error {
		c := tools.NewColly()
		var pageDesc string
		c.OnXML("//meta[@name='description']/@content|//meta[@name='Description']/@content|//meta[@name='DESCRIPTION']",
			func(e *colly.XMLElement) {
				pageDesc += e.Text
			},
		)
		if err := c.Visit(tryURL); err != nil {
			lastErr = err
			return err
		}
		result = pageDesc
		return nil
	})

	if err != nil {
		return "", lastErr
	}

	return result, nil
}
