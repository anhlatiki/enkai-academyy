# Enkai Academy v2 — Art Agency Style

Website portfolio nghệ thuật số lấy cảm hứng từ phong cách premium digital art agency.

**Chủ sở hữu:** Phạm Anh Quốc  
**Tên web:** Enkai Academy

## Cấu trúc thư mục (QUAN TRỌNG)

```
enkai-academy-v2/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── data/
│   └── works.json
├── assets/
│   ├── images/
│   └── videos/
└── README.md
```

Khi upload lên GitHub **phải giữ nguyên cấu trúc thư mục** này.

## Cách thêm tác phẩm mới

1. Thêm ảnh vào `assets/images/` hoặc dùng link Unsplash
2. Mở `data/works.json` thêm object mới:

```json
{
  "id": 7,
  "title": "Tên tác phẩm",
  "category": "digital",
  "type": "image",
  "src": "assets/images/ten-file.jpg",
  "description": "Mô tả chi tiết...",
  "date": "2026-07-24",
  "author": "Phạm Anh Quốc"
}
```

Category có thể là: `visual`, `digital`, `3d`, `video`

## Link sau khi lên GitHub Pages

`https://ten-github.github.io/ten-repo/`
