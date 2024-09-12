### Run
``` bash
cp ./development/local.env .env
npm i
npm run build
npm start
```

### Visit Website
[http://localhost:3000](http://localhost:3000)

___

### Run on Development
``` bash
cp ./development/local.env .env
npm i
npm run dev
```

### Visit Website
[http://localhost:3000](http://localhost:3000)

> [!WARNING]  
> On first run, an error may occur which is caused by [Material Tailwind](https://www.material-tailwind.com/). This can be fixed by reloading the website.

___

```
📦src
 ┣ 📂app
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂(component)
 ┃ ┃ ┃ ┣ 📜auth.tsx
 ┃ ┃ ┃ ┣ 📜signin.tsx
 ┃ ┃ ┃ ┗ 📜signup.tsx
 ┃ ┃ ┗ 📂api
 ┃ ┃ ┃ ┣ 📂me
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂signin
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂signout
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜navbar.tsx
 ┃ ┃ ┣ 📜profile-menu.tsx
 ┃ ┃ ┣ 📜progress-bar.tsx
 ┃ ┃ ┗ 📜root.tsx
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📂(component)
 ┃ ┃ ┃ ┣ 📜content.tsx
 ┃ ┃ ┃ ┗ 📜welcome.tsx
 ┃ ┃ ┗ 📜content.tsx
 ┃ ┣ 📂table-plus
 ┃ ┃ ┣ 📂(component)
 ┃ ┃ ┃ ┣ 📜friendly.tsx
 ┃ ┃ ┃ ┣ 📜raw.tsx
 ┃ ┃ ┃ ┗ 📜table.tsx
 ┃ ┃ ┣ 📂(data)
 ┃ ┃ ┃ ┗ 📜data.json
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂testimonial
 ┃ ┃ ┗ 📂(component)
 ┃ ┃ ┃ ┣ 📜card1.tsx
 ┃ ┃ ┃ ┗ 📜card2.tsx
 ┃ ┣ 📂todo
 ┃ ┃ ┣ 📂(component)
 ┃ ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┣ 📜list.tsx
 ┃ ┃ ┃ ┗ 📜remove.tsx
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📜actions.tsx
 ┃ ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂api
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂asset
 ┃ ┗ 📂style
 ┃ ┃ ┗ 📜app.scss
 ┣ 📂constant
 ┃ ┣ 📜auth.constant.ts
 ┃ ┗ 📜message.constant.ts
 ┣ 📂enum
 ┃ ┣ 📜form.enum.ts
 ┃ ┗ 📜todo.enum.ts
 ┣ 📂model
 ┃ ┣ 📜table.model.ts
 ┃ ┣ 📜testimonial.model.ts
 ┃ ┗ 📜todo.model.ts
 ┣ 📂service
 ┃ ┣ 📜api.service.ts
 ┃ ┣ 📜auth.service.ts
 ┃ ┗ 📜neversitup.service.ts
 ┣ 📂store
 ┃ ┣ 📂slice
 ┃ ┃ ┣ 📜auth.slice.tsx
 ┃ ┃ ┗ 📜todo.slice.tsx
 ┃ ┣ 📜hook.tsx
 ┃ ┣ 📜provider.tsx
 ┃ ┗ 📜store.tsx
 ┣ 📂type
 ┃ ┣ 📜common.type.ts
 ┃ ┗ 📜document.d.ts
 ┣ 📂util
 ┃ ┗ 📜common.util.ts
 ┗ 📜middleware.ts
 ```
