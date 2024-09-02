# dst-admin-go 面板开多层世界教程

开启多层世界，在此面板是一件非常简单的世界，可以任意增加世界减少世界，并且增对多层选择器模组做了界面适配

**下面开一个 三层的世界作为示例，一个森林两个洞穴**

## 1. 添加世界

添加两个世界（默认已经把端口和世界id，世界名顺序设置好了）

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled.png)

这是添加完成后的界面

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled%201.png)

## 2. 配置多层选择器

现在配置多层选择器，按照下面配置，设置好世界id，分类，分流等信息，点击保存，就会添加多层选择模组了

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled%202.png)

## 3. 启动世界

现在我们启动所有世界

```go
[00:00:12]: Mod: workshop-1754389029 (多层世界选择器)	Loading modworldgenmain.lua	
[00:00:12]: Mod: workshop-1754389029 (多层世界选择器)	  Mod had no modworldgenmain.lua. Skipping.	
[00:00:12]: Mod: workshop-1754389029 (多层世界选择器)	Loading modmain.lua	
```

我们会看到 多层世界选择器 模组已经在加载了

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled%203.png)

当你看到下面的内容就代表已经弄好了

```go
[00:00:37]: [SyncWorldSettings] Resyncing master world option dropeverythingondespawn = default to secondary shards.	
[00:00:42]: [Shard] Secondary shard 洞穴2(3) connected: [LAN] 127.0.0.1
[00:00:44]: [Shard] Secondary 洞穴2(3) ready!
[00:00:44]: World 3 is now connected	

[00:00:44]: [SyncWorldSettings] Resyncing master world option ghostsanitydrain = always to secondary shards.	
[00:00:44]: [SyncWorldSettings] Resyncing master world option darkness = default to secondary shards.	
[00:00:44]: [SyncWorldSettings] Resyncing master world option resettime = default to secondary shards.	
ncWorldSettings] Resyncing master world option dropeverythingondespawn = default to secondary shards.	
```

## 4. 使用面板在线查服，看世界层数是否对得上

从世界数量为 2 ，代表已经完全开好了

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled%204.png)