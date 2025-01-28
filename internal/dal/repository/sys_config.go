package repository

import (
	"context"

	"github.com/ch3nnn/webstack-go/internal/dal/query"
)

const (
	DefaultAboutSite = "> ❤️ 基于 Golang 开源的网址导航网站项目，具备完整的前后台，您可以拿来制作自己平日收藏的网址导航。\n\n\n> 如果你也是开发者，如果你也正好喜欢折腾，那希望这个网站能给你带来一些作用。"
	DefaultAuthor    = `
<div class="col-sm-4">
    <div class="xe-widget xe-conversations box2 label-info" onclick="window.open('https://blog.ch3nnn.cn/about/', '_blank')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="https://blog.ch3nnn.cn/about/">
        <div class="xe-comment-entry">
            <a class="xe-user-img">
                <img src="https://s2.loli.net/2023/02/20/H1k52mlXNYKWDrU.png" class="img-circle" width="40">
            </a>
            <div class="xe-comment">
                <a href="#" class="xe-user-name overflowClip_1">
                    <strong>Developer. Ch3nnn.</strong>
                </a>
                <p class="overflowClip_2"> 折腾不息 · 乐此不疲.</p>
            </div>
        </div>
    </div>
</div>

<div class="col-md-8">
    <div class="row">
        <div class="col-sm-12">
            <br>
            <blockquote>
                <p>
                    这是一个公益项目，而且是<a href="https://github.com/ch3nnn/webstack-go"> 开源 </a>的。你也可以拿来制作自己的网址导航。如果你有更好的想法，可以通过个人网站<a href="https://ch3nnn.cn/about/">ch3nnn.cn</a>中的联系方式找到我，欢迎与我交流分享。
                </p>
            </blockquote>
        </div>
    </div>
    <br>
</div>
`
	DefaultSiteTitle     = "WebStack-Go - 网址导航"
	DefaultSiteKeyword   = "网址导航"
	DefaultSiteDesc      = "WebStack-Go - 基于 Golang 开源的网址导航网站"
	DefaultLogoBase64    = "iVBORw0KGgoAAAANSUhEUgAAALIAAAAoCAYAAABad6BNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGxmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDUtMDJUMTM6NDU6MTYrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA1LTAyVDEzOjU1OjMxKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA1LTAyVDEzOjU1OjMxKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmE2YjVjMjI2LTUwODctNDY0ZC1iYTRmLTc0ZTk4ZWI1OGVlMSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjAzNjllYzI0LTA5NjItMTg0Zi1iMDFmLTMyMmI0NWU5YTY1ZSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjNjNzI1MjBhLWIxMjEtNGM0OS05YWE3LWRiOWYwNTlkMzFjMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2M3MjUyMGEtYjEyMS00YzQ5LTlhYTctZGI5ZjA1OWQzMWMxIiBzdEV2dDp3aGVuPSIyMDIzLTA1LTAyVDEzOjQ1OjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YmYwNTQ1MmMtYzE3Yi00NjE0LWJiNDYtYmJlMWYyODEzNDE0IiBzdEV2dDp3aGVuPSIyMDIzLTA1LTAyVDEzOjQ4OjQ5KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTZiNWMyMjYtNTA4Ny00NjRkLWJhNGYtNzRlOThlYjU4ZWUxIiBzdEV2dDp3aGVuPSIyMDIzLTA1LTAyVDEzOjU1OjMxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7+jvAc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"
	DefaultFaviconBase64 = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAA+VBMVEUAAAC6sWUzNjZCQkIsLi8sLjAsLi//tSs6Oj8tLzAsLi/9sycsLi/9sycsLi/9tCctLi/8tSj/tSguMTEuMzQzMzMwMzb/ujP9tCcsLi8uLzEtLy8sLi8sLi8tLi8sLi8tLi8sLi8tLjAsLi8sLy8sLi8sLjAsLjAtLy8tLzAtLzAuMDAuMDL/tyn9tCf8tCctLi/8tCf8tCf8tCf9sycsLjD9tCgsLjD9tSf9tCgtLzAtMDAuLzAvLzEvLzL/ty0tLy/+tij9tCj9tCj9syf9syj9tCf9tCj9tCf9tCn8tSj/tCj/tikwMDT/vzP/v0AsLy/8sycsLi+FeN01AAAAUXRSTlMAAg8F/uOqIwv7+Pjp6dLQdWM/KSIcFg3v7Uv18tzZzce5ta+ej4eBb2lUQT0x+8jBvrWvqpqLiollZGBcNjAck1T039fNo5h7cFpHOB8UCKLRW+BFAAACmElEQVRYw82VaVPyMBSFW5aC7FulgMiqICIIIiq4gPvum/7/H/NOe+00xwZL+OTzhZkm5wz35txE+eOo2ZExyqob63NpZpHObSaPTJjDJCIvL57HmUv8vChbfJIhyawqVzwg2YrICRNzEpEoHpBohXoBxXtIXqhSxUu0QlS8ZCuK0zhbj/i0KFu8fyuO0kyO9BHqDSaLAQ5jJs+YNzCYPAZvMGTyDHmDVybPq8KTjUvK41kFuZlI6Sc3gjl4WFv+kPO7hpD1L6fidOArH8AgeIiM/eITWSUtdIP279v9L/L7N3tPsFv4KY/ux8xwj1rxYqzK3gsV3wubsf0o6AN10+L4WrH4fBqIin/6tFevj+299QBv0DaJ0Ok2TefIox/R9G2fhkyizRuETYfSdyuWdyC/W34XXzIdwrzBrumyW7Y/fT3fMofb5y/7Wxn28QZnJk8zT+l+ZMQj5TbfhF1nvEFQg7WtPerQ+9Aa23fq894W7NGCCjBPwHJiplKwlhQcdfZjfa6IksBT63OL/RqsuSkACi0T0D4U4kPDhRaXQ+QwBRsrnYBVfKcCX1OHv72tByW0aC1aKC8dqCuniZq9wGYjW4uAuxfp10JtinG+sVLfyFOc2yGnxZiknQydba8qlFd7lJnMDuTIJuPsKbt7ANe97LhneIOU4F+CXFBfijdIeGN8Vef09StvnBO8gSY6qcuwM7iXojPWeAO9KspKtBOzctuJilJW1RVwEKdV7/7r6uKc6z4xhnmBSYM4Y4ydVkLl0A0iIYgzNBl7T+eBxyRCdGuFmrPyrBny3ndi4N4E4Mb1AWIsirMv9HYA+Or4Q68XQu+eBL0wqunllSEKN2GF4iyHrkFuN6FfwxdCHnXeKDXmqvKn+Q+oeE3vIQF62QAAAABJRU5ErkJggg=="
)

var _ iCustomGenSysConfigFunc = (*customSysConfigDao)(nil)

type (
	// ISysConfigDao not edit interface name
	ISysConfigDao interface {
		iWhereSysConfigFunc
		WithContext(ctx context.Context) iCustomGenSysConfigFunc

		// TODO Custom WhereFunc ....
		// ...
	}

	// not edit interface name
	iCustomGenSysConfigFunc interface {
		iGenSysConfigFunc

		// TODO Custom DaoFunc ....
		// ...
	}

	// not edit interface name
	customSysConfigDao struct {
		sysConfigDao
	}
)

func NewSysConfigDao() ISysConfigDao {
	return &customSysConfigDao{
		sysConfigDao{
			sysConfigDo: query.SysConfig.WithContext(context.Background()),
		},
	}
}

func (d *customSysConfigDao) WithContext(ctx context.Context) iCustomGenSysConfigFunc {
	d.sysConfigDo = d.sysConfigDo.WithContext(ctx)
	return d
}
