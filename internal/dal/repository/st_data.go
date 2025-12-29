package repository

import "github.com/ch3nnn/webstack-go/internal/dal/model"

var DefaultStCategory = []*model.StCategory{
	{
		ID:     1,
		ParentID: 0,
		Sort:   1,
		Title:  "AI 大模型",
		Icon:   "fa fa-rocket",
		Level:  1,
		IsUsed: true,
	},
}

var DefaultStSite = []*model.StSite{
	{
		ID:          1,
		CategoryID:  1,
		Title:       "DeepSeek",
		Description: "深度求索，国产之光，超强推理模型",
		URL:         "https://www.deepseek.com/",
		Icon:        "",
		IsUsed:      true,
		Sort:        1,
	},
	{
		ID:          2,
		CategoryID:  1,
		Title:       "ChatGPT",
		Description: "OpenAI 旗下的智能对话机器人",
		URL:         "https://chat.openai.com/",
		Icon:        "",
		IsUsed:      true,
		Sort:        2,
	},
	{
		ID:          3,
		CategoryID:  1,
		Title:       "Claude",
		Description: "Anthropic 旗下的智能对话机器人",
		URL:         "https://claude.ai/",
		Icon:        "",
		IsUsed:      true,
		Sort:        3,
	},
	{
		ID:          4,
		CategoryID:  1,
		Title:       "Gemini",
		Description: "Google 旗下的多模态大模型",
		URL:         "https://gemini.google.com/",
		Icon:        "",
		IsUsed:      true,
		Sort:        4,
	},
	{
		ID:          5,
		CategoryID:  1,
		Title:       "Kimi",
		Description: "月之暗面旗下的超长上下文智能助手",
		URL:         "https://kimi.moonshot.cn/",
		Icon:        "",
		IsUsed:      true,
		Sort:        5,
	},
	{
		ID:          6,
		CategoryID:  1,
		Title:       "通义千问",
		Description: "阿里巴巴旗下的智能对话机器人",
		URL:         "https://tongyi.aliyun.com/",
		Icon:        "",
		IsUsed:      true,
		Sort:        6,
	},
	{
		ID:          7,
		CategoryID:  1,
		Title:       "文心一言",
		Description: "百度旗下的智能对话机器人",
		URL:         "https://yiyan.baidu.com/",
		Icon:        "",
		IsUsed:      true,
		Sort:        7,
	},
}
