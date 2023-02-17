# vue-3-pinia-registration-login-example

Vue 3 + Pinia - User Registration and Login Example & Tutorial

Documentation at https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial
```
itdns-frontend
├─ .env
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ bd166902a6a5f83fdd059ac8040328c49f07cb
│  │  ├─ 01
│  │  │  └─ f6eecebeae56eaecc4cace7d8c33e4df9aa5aa
│  │  ├─ 05
│  │  │  └─ 7a2d105f5f82eb04eae220a4aaad1d3787ebbe
│  │  ├─ 0a
│  │  │  └─ c45cfcf8365205b7c24ad4593459b0b591a731
│  │  ├─ 0c
│  │  │  └─ f8c3c38c651d9cc4ba3343dbd10988ecb9985a
│  │  ├─ 11
│  │  │  └─ b834ada32edb318e06c29b48401e5efe0456a1
│  │  ├─ 13
│  │  │  └─ 26c5aa167a51657e9a1b0c699dbded777427e4
│  │  ├─ 1b
│  │  │  └─ 6fa476f10263577367d08c073cbd6fc3ba73fd
│  │  ├─ 26
│  │  │  └─ b5503316a9cc66b6fe82769122f71bf3285a9a
│  │  ├─ 2a
│  │  │  └─ ec67475ecdf9afabd1bdd1e38dd3a71b716575
│  │  ├─ 30
│  │  │  └─ e8623e27380f6e43456d4f6c66df004c969496
│  │  ├─ 33
│  │  │  └─ ad091d26d8a9dc95ebdf616e217d985ec215b8
│  │  ├─ 38
│  │  │  └─ 5aec6ac6bed0a9406f5b40fc1ebd786978b1a6
│  │  ├─ 39
│  │  │  ├─ 54736836e4df9e4721f884716f57e5d4ad12bc
│  │  │  └─ d34c2493f07b2567f7174d8ce2911785c7efaf
│  │  ├─ 4e
│  │  │  └─ d610d31b0fe0793c36da01ae365bda95091e22
│  │  ├─ 52
│  │  │  └─ a334f7cc3780aa5f89016e941efc3827dd2a47
│  │  ├─ 5a
│  │  │  └─ 7aba67b2bf4d5e7a07408cc03726b59d025d44
│  │  ├─ 6b
│  │  │  └─ 5e3d18b3e11a6c0bf561dacff7ed2f16970473
│  │  ├─ 6e
│  │  │  └─ 50288c601137305a824b1720b36c80cfaf39ae
│  │  ├─ 70
│  │  │  └─ fb6cf2c007ddde658bc9b595f47f0ca564a85d
│  │  ├─ 71
│  │  │  └─ fd4e8bb3f99f82ba6abdda9ee4459a532873ae
│  │  ├─ 72
│  │  │  └─ caf46661fbb6fcca947587c45b9abfdef1cac1
│  │  ├─ 79
│  │  │  └─ 96bd24c814dfa1f5c55f2ec207f4afa73ff71c
│  │  ├─ 7b
│  │  │  └─ 11b6a78c0ad6e41fe78d2f3df723b048cb15a5
│  │  ├─ 8b
│  │  │  └─ 8fc5c5f76cbe84f6b6319cc80834ee41ad59ac
│  │  ├─ 94
│  │  │  └─ 99d109a6b200b3e6b779f7a0f6b9044558f5a5
│  │  ├─ 96
│  │  │  └─ 0cbe29bffe289b07c39f8d4333ef0a4b5dd29f
│  │  ├─ a0
│  │  │  └─ 49c61414e09e78c371330a38c8bf6b0a355c09
│  │  ├─ a2
│  │  │  └─ f1f4db65dac3098d5cd1da66477a901fdbe36b
│  │  ├─ ae
│  │  │  └─ 67d386c3e0356b39b02a5122a7c1f95a1f8420
│  │  ├─ b4
│  │  │  └─ 7c056982e563792ccb7a5bda3b245f437f65d3
│  │  ├─ bd
│  │  │  └─ 6213e1dfe6b0a79ce7d8b37d0d2dc70f0250bb
│  │  ├─ d2
│  │  │  └─ 33b99840c1041e2e6887d512eeca67cb85dfb9
│  │  ├─ d9
│  │  │  └─ 2239b7c2bfd648d9661fa3d39374b4579422fc
│  │  ├─ db
│  │  │  └─ a735f5308aaaaa29d9065594f8c717bcb19655
│  │  ├─ e6
│  │  │  └─ 56b158a5ac28149dbf02f9d89192285e274f00
│  │  ├─ e7
│  │  │  └─ 57b7f995fceceaaef872e390b28ccdba94f436
│  │  ├─ f3
│  │  │  ├─ 86d3576e2c74578bdb439662338e91f0999f43
│  │  │  ├─ c04f643051112bec44e2104c5a744f36db2b5b
│  │  │  └─ e5cb59244ecdf3d7de1cad88a998af51619a14
│  │  ├─ fd
│  │  │  └─ 1ae5cd64b9a6bde910f612d5c9fabd7826d392
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-3c0ab06785b1b719b7c2bea3985cc9a7fea99804.idx
│  │     └─ pack-3c0ab06785b1b719b7c2bea3985cc9a7fea99804.pack
│  ├─ ORIG_HEAD
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     └─ master
│     └─ tags
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ base.css
│  │  └─ tailwind.css
│  ├─ components
│  │  ├─ Alert.vue
│  │  ├─ Alert_bs.vue
│  │  ├─ Alert_old.vue
│  │  ├─ index.js
│  │  ├─ Nav.vue
│  │  ├─ Nav_bootstrap.vue
│  │  ├─ Nav_tw_working.vue
│  │  ├─ Nav_tw_working_dropdown.vue
│  │  └─ Nav_working.vue
│  ├─ helpers
│  │  ├─ fake-backend.js
│  │  ├─ fetch-wrapper.js
│  │  └─ index.js
│  ├─ index.css
│  ├─ main.js
│  ├─ router
│  │  ├─ account.routes.js
│  │  ├─ events.routes.js
│  │  ├─ index.js
│  │  ├─ systems.routes.js
│  │  └─ users.routes.js
│  ├─ stores
│  │  ├─ alert.store.js
│  │  ├─ auth.store.js
│  │  ├─ index.js
│  │  ├─ systems.store.js
│  │  ├─ users.store.js
│  │  └─ users.store_ohneredirect.js
│  └─ views
│     ├─ account
│     │  ├─ index.js
│     │  ├─ Layout.vue
│     │  ├─ Login.vue
│     │  ├─ Login_bs.vue
│     │  ├─ Login_tw_old.vue
│     │  ├─ Register.vue
│     │  └─ Register_bs.vue
│     ├─ events
│     │  ├─ AddEdit.vue
│     │  ├─ index.js
│     │  ├─ Layout.vue
│     │  └─ List.vue
│     ├─ Home.vue
│     ├─ index.js
│     ├─ systems
│     │  ├─ AddEdit copy.vue
│     │  ├─ AddEdit.vue
│     │  ├─ index.js
│     │  ├─ Layout.vue
│     │  ├─ List copy.vue
│     │  └─ List.vue
│     └─ users
│        ├─ AddEdit.vue
│        ├─ AddEdit_bs.vue
│        ├─ index.js
│        ├─ Layout.vue
│        ├─ List.vue
│        └─ List_bs.vue
├─ tailwind.config.js
└─ vite.config.js

```