/**
 * @author Doraemon
 * @name Doraemon_返利插件
 * @origin 红灯区
 * @version 1.0.5
 * @description 支持京东返利、淘宝返利
 * @create_at 2023-12-04 18:00:00
 * @rule (item.jd.com|item.m.jd.com|u.jd.com|jingfen.jd.com)
 * @rule [(|)|#|@|$|%|¥|￥|!|！][0-9a-zA-Z\s]{10,}[(|)|#|@|$|%|¥|￥|!|！]
 * @admin false
 * @public false
 * @priority 9999
 * @disable false
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件
       Doraemon_返利插件.js 放到自用插件中

    2、设置参数
      白名单群组，不要在QQ发这个命令
        set Doraemon rebatePlugin_groupWhitelist 123456789,987654321
      
      模版类型（默认1   1： 复杂模版， 2: 简单模版 ）
        set Doraemon rebatePlugin_parse_type 2

      通知群组（支持多适配器随机发送）
        set Doraemon rebatePlugin_recipient tgBot:userId:xxx

    3、淘宝（比较复杂）
      淘宝功能使用的是大淘客需要注册账号，然后申请appkey，以及绑定对应的PID
        地址：https://www.dataoke.com/pmc/apply-l.html
      
      壹 先添加应用：复制appkey
      贰 点击左侧授权和PID，配置PID，根据提示自行配置
      叁 set Doraemon rebatePlugin_tb_appkey xxxxx

    4、京东
      京东联盟id
        set Doraemon rebatePlugin_unionId 123456789

    5、是否愿意共享返利线报，一起分享，则可以进入共享线报群组（默认true）
        set Doraemon rebatePlugin_share_flag false

      共享线报，请设置你的userId （通过给机器人发送 我的id 获取），反之，则忽略
        set Doraemon rebatePlugin_share_userId 123456789

  ----------------------

  注意：
    1、无界超授可用
    2、自用插件
  ----------------------

  功能：
    1、东东商品转链（已实现）
    2、东东商品查询（已实现）
    3、监听返利群转发到指定的群组（已实现）
    4、淘口令转链查询（已实现）
    5、共享返利线报，愿意共享用户，可联系 https://t.me/Doraemon_o 进入共享群组（已实现）
  ----------------------

  更新日志：
      v1.0.0 插件上线
      2023.12.5 v1.0.1 新增 支持解析结果推送到指定群组/用户
                       新增 对接了redis的，支持重复推送返利线报过滤推送
      2023.12.5 v1.0.2 新增 淘口令转链查询 
                       新增 共享返利线报功能
      2023.12.5 v1.0.3 bugfix
      2023.12.6 v1.0.4 优化 长淘口令
      2023.12.6 v1.0.5 优化 使用商品id作为去重标准
*/
/** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203d52fa820117c3d260dfab58bc173038836042490b450dd460d42f941860d6a9b6ae31f60456d00bd332ee04cb83483f29f203e444f8d3c712e97aafcea085bd7ec7e101136da6d49c03d4d00d8394a62966c6a5796460582429e173d8cca833e8d1553b0c10c835db8bd9e52f16ca8fbfcf89376f30a92b6c415e354460672b7bd659e6084981beb33817e2a7849d68e98c5cd097d39ea17e0040553df5c1294dc82cd1b2a78af04beb103a7a9b2f62207bb98494c81367ae357e5db5cea46e353d951b8ea5333c0d1d0ea1b0e09fd9c5b2d0b9f7738b925cc95be7bd4ae70594d390952019e4783ddc09e2ab6900eec1328c8d19eeb0f652cf5de6c194258770232f56ab4567fb4fb695ead35d0bb76cc13a6141cbbb1ca0618185441bd6945f364e7520eb5fb593eaf5ad1871a7f544e8d0ad4e421356d3cbdb0578e828d0758366e3d16f4155a5271155c74d357f4caec9d325d75d5b073e8ad3587eac29db02ff78439a929fd29ab644c592fc646020eff7e6cda27b200607b254ad987715a29296aa086c7eac66c183821f7b0503c82a37a04d41f67c31064274254a6e79b4b3a63bcbffd717aa9740db4115991945f90e5764d3e8217ee77e62df1244611552fd0673fb1aec7ee6e896880b94f44f7f10221ba475cf7b2233a829077232930b66bb62cc24dd0f08a742a3aade032d5ae108ff39e7329a38e4bf2399527db4e2d6c3ca63f2caa5154931d75a03730b1e3eaf8f9d575e57b0168b42b38227d05444a67904097909aeb2b5a9632df783474a35aa8b3b0256f71b4fbccc9a2ded2b99cb2b29931b6131bccdfaebe6ecb815a06350fc4e045b265cf422cbee8d620fe64a4bdc7e2a38e4c4ced20a294efb6f0de17aa2a6c828bca552386370410937dc850e8d9ecf1eb13f90b7efc4c32c262499fcb416207b24d1d19b753d5dec762f247a6736a28795a3cfd6b08703a803d680f4887240441f7bd9a55b34a20172212f7a7c6c70f161942dc1b7cb152744c91616e4953be88e766fad2d3713b0b80e1fd3bbdd85bcd5c2108c4f6e7534000190aad918a4274cbaf50b99706fa8bdcc43f117ab4feeda968e233006b561326b0a29eab3fa95772e141923389a18bbace8ea6c3b1d4cb9655be4a8e13569155689565a6eddca051086d8fc3cbd62666d96ec9462ac04a105680ad4b2255d8ba4a7a942c42f1666cfc992b9205058d5b384590755131a891c9c1a309ef57d91c38ea4ee5461e483f487d2c416869cee568e3f41dbef0e42306c81e0615cf5500525f324477aab227817b753e3bd189a9bad4f9da7396ad659f4f43f9d4607514607ac4e22eabc0c024c042fb72d6ddc6c92dd4b2e8892b02eef644c1e4f5df59020a2f1c8039239bd5e534c799c1722981ce956c5ac81e41446d8935d1bf2375182fcf570c99435aa23e0d98a6a455f1472cf76e947d2e681faecf891520c9d5b43c9754965321fee20e5a57fd8f0aad7311a51ff25c09c48c918abd3cf7f06d5646935bd9d7b70cec59697f81b624732f16b937490f8accd30f0b835981271ffcaa1594a8169852c1cc03c0f3af158f5ce2a410bff94e8b6d81080d2c31c750eeadfbeba0c8a4fa72b0e47c3a5b87a2c94592487995c68f0f450f138f44db497d6f68900d9564d2298fd4a7712db616552d7d3fd7efcffbdc3a0090f0d72ccb22cb1085aa8637e73285244b3d4a506eadefd7ae4471048f5623f5e2fb985bcfe33a46b37f86a48c486096091d343652539c7ad4cfe4c9e363460cc8d38294a98494bcd7de378c385aff32986dd218f198f7a2141d082d5fe26fde8557b60736b87523ee941cf4387116285871c85ec764347916fd23a385ac34f45eb2a5360fd4be528c2b81444675b6465dea84a53f38e72f67356bd58b0be60aedb2504a363f99fe088df8c69091b63840614c8e8e4d7bab69a189b2b5867f2275c072744b36fd6d523ebb8ce1ae2ddaf100ae596ddb2ab27f708308322b60b3718e712c0b0d4a56728448201fffc952c928073af23df658d9812ed3dd1ebec7632bf6b22a17afdeaf7d83d2f0ceded5d509c0ff1aad600e045916f6f54550c3bcf526e3077361eda6a45a951dc240ee23306fa24dd7c03bc73a27e4850267871986f43d66ea16bd8ad5db9c1830193ca1faa9fdee7bbe0d3cae5a03bbf70f1fc3cad4e3a71adba83da22dfcb3d523fc3069889c4a3fc169e6631158d041942b83054ca1307b587cea470dd0443afc44914cabc375ebc62e30b0d314f40b2aec342a86df9b1a379d48cc9fb4929d9a5c9ca54fe8e6367f863754bc2572d3233cb64e6af383529e1c26e6bd91e9fb27616e5b820e29931a687241c7f456016a9536c6e274149f9ed3b51637ccf462f19c7657d245f09fea37bbc08178da3470fc3ea4d1d350ebe6674fc1dc7c1e74428456f8600a0a36c96c4f01bb20fecd122260650bb898e065232c6d9019f75eb9047f7118027507436d0ef5c8bc7c48fc85f9d106142433119f31b891472897a5f9d386675dbf7b196716897cef92d0da2641e8fd90888766ae153b5f0798c8f4e1d787ce2c87fa8b6c0a89547e4258aa77a7818eaf9a68cc22c3d12ff862b4f71f1eb992d98c793def7aed6d12dd78ed73a8197fab8519983260645bcb1983b71a85dc12acb9b3a40caf1cf11f1a046c48b4e35c8600096e211cf48ac745cd7fe3d659197ce5cd15f5327b211cd690c22fc64a7c4ca0afa654568ec448ded3e2b3389da10190e40fb614a034ae431f80f63a054333236221c5d2ee6a23e71d27cf21071efda7c86f1061e3c3dd39349029ff483fe53273181b005e069c30672cd0093480939529c7b185934f0f6896cb70537de02b80f2f4265590be2ec62f1f5f897a1dd9992305eb94371f2c31653a90eba7d2a4e228bdc1bb258cb129b72cd03c23e4fdc78b24adef00c703bb4b0350c2ececaab6d6a78edfca9138c7507fe024b1938c202daeb138f0a62bc56def2c430f9cbd9ee5aa0c510e14647dba55c693379b0f0924d11457943d6784ed63e91382f8230272ca780f9be80769f1007f8cc5b7fe94c84d0c3c27008bd25b11b7a7a06cbc310dbf0cdf0648f3253f93000a3e263ed94c18ff192b96027aed09cee04a5d9be05e43968b1385a76c4f0251f8189b2a91099ef77c4125a6a1f4fb7850416a10e8ec4a1440d775146db02a66ff20da5941a0556f8fbbb3dc702eb53c9a550a5a74e6004f692087e989227e725a5d2690a82af95f5799c1a5116c598c24eb970520bb8a913d305ef5939faa0df0009d9d747e309879dc416fc61b5ddf7f56f548a8101b1264bf35a404e909716261be21195d419959757cf28f08440f9d2d3ae3c996cbd323fed99ec8aeaf7649bcb9f0fa38c91760890d3dced73bfd3b7ac892b57231ce1bd64a10c7bea542ac16412032b88896867c28b3cdcc73218402240046a626c94240f479a080d5503f59c172d34f4be1f2bfebf70a7ae08aacce9b40251bf70bdf9b890e705dcab2af81fc3a68d49d894db1919dc0360eb0f6d6942cd08835e5676bac0411b3e7eecd9e3474b95e9c75d9a15fa35efbf51d4de7bf28222f9dc8eea80cdee468d7db7b4d4e1e0d4e08e5d945bbed83071ad6e54fc9407d6dc736fa608d3e09c05b9745683a78981e8022ad3eeff330060fcca78e377a5631be99e1830276aedbea56a1fb01f7dc4b9198a177359704205eb79041f7b84496a4957f0fe7e45e18f12b119aa9d03ddd5901852a066d67a3ed36027de08f349c0ae9fc214331077f40ffbfac92033a6a81906a353872f3250a04559ee811184c4721b777e21026028874817d1709cfb354c7f170cc0741c47a9636a635f8c2b127c0b97918ee3fd9c3c212343b35643235894047008f58b2407092ce7d18bb3f9103f11c92a0b2692bccdf6b59e9386d5fe389d7d55f71959a38d427f9601ec889c03e5d657f2469fdc585c211dac4498651d309c152c4a2dd18b5d6ebe6f0d04aa856c201c5a005ecfbd02e78996c994b0bbc70c198803c50f37e58774e0ae503911416adf002d00a17bc5476a794f665f280076baac59b145d262c79f3534a96365a0b525c18b917c11da390b5e27196ddde2de0bbc3bb5104c0bda914f31df7b1e114deeab6d16aac50c786a9dd6de1dcc2fcfc5d1313dce70b3e08003f4f7885f5fbeb2ba3a6adfa4b9990a7b46ab0fb1fa51f6191b18a8741dad04e55b9b1578148a787f0ab8d6084360b5af464f3e0296ea2240427a53859cad5efae804358bc508b4fe1fa28ca3909f536aea5f2d225169b59995d16f30f82ac0bfa4c14bb40f0e7db44cfcb53bdb5b75cbd3c55f7cf52f36b7180dcd57586de67f29f4e4fdd7e1f2ddc0c6e68588ddb4e96a321dcd656861a8ee26218dc08f8700590d0f4058a25122b1ff5e48924591c770f5dc011188b4ee0535a70ab509afa25314fb4733c5f304e4bb65f3ddec0a95547dee430e8505ca5f10bde58201af2f78eae39f71392237cc0253e2e241bccfa97eea1daa281edc0654bb956cdc8826103b47ae526ef6eb4c3185ed6425d70bfc59da7f533d3115c859df90d2eb95e67fccaa8bae1e030553904b212b3ed471eda70371f37ea0ee68428958cb7b49aa9a3468c6731e722c0b50c5248ded111d74eaf4101cadb30a423649b0af0cc464d7c965540907867a447a3f4604bd1f9016d487aa1f5d1b0c7bf072d57d8593127340cf6ee92561416dadfb06a9ca6aa353a9c3015d67f6061fb3f7cd0fddb92227579f9fbdb454bfcf2c324169d71ba6e566a1776538fe5a3bd3a7ed2f97f29e536f3ccfc9a67998645e2008188ffb4d630b95c0f8a36e542750fee49726b3e31e1c9b88580916c20a06edf5d2108540c4b15ab9d0671b788391d7bda06bac6136382eb84f40dc39dd0eff3ec7c00e798f034796338dbc3d473b3dfea6d6b57c50f6bcb515caa05787c3eed60feb7f6a7055d210cc2e80ca8be5828d04c5865597a6431a939986b00f87f18a1a70d61aee9d332f0826a86a1e34f4b3623ab60979b0ac5d2fd1bff42592c47a02a4e17513aeca0c1caa2eab5ae5fb1e71b0bc70110138158da1590ab8c38dc4b3a70c2717f268848ec19db57064a994dfac524569f553e5a7165ecb168345ae622117aa45f4da69c3d1b27646764c4efd14674e9116be1cba73c9268c3683d99e5aafd8f5d98c26013ec6be7bd48b6e9b5788f06b790261138e8e9dc65d6eb269dfe4888235ba31be3c27dc4823683c6e32f37069224c125c4cf0862d2c0a1e323f387878ec05e696874e1caf6fb314edb5714ee623df8a64cba5e8629c926d2bceec1423230ebe882bd92f83046d49866233005a4946332793715d07db45ce4e3bd844b665ea958f6158bfea8c5e98b4cc5a94a0800fe8e6f55d166ea1b88d7fb57996c2a1e53daeb83a4929574ef9dcd194ad038e0e8e469a0e1813715efb0784fdac9ee78a4bc1ecbc1365d93083bab74b62abf4b2fa14f1cd703cfafd5bfd4fdce38334b5604536a5587e3316c4003dfa464fda4e93a2b09b3462bbeca45a34e834cbbf0b35d8443930b4a919f3c1f0c3e853b3d97c547ed9243d68c79fd77088356ba4309fcdefe9023ac9dffeee8f87292ce1a53ced3eb04ddbf9abe25e37f6f8db5f2c32405f14f70fd10e0ae94b953e93c53160c92f1aaa862d30b8b8e8b9d2005405faff308498aab3d5bf48dfe8383de88fe5089a8e73698603498e301c9f0d8c766ed8dadc07ae5adf13d9078a3652fd2bf33a292827d3a8b34377ecf10006232db06158002d7219edea03cfad19db9add0e217f3ca439b4094571ebf8f6c65d6a37a3319fa63ed9f4bfeb7c1f66e70c3b0d5713f93d455e4ee808ed16161c6f7e3a84c511765382e1d812531b1e1314ed39c531e937de9174fafa396b70afe714512d6b47d2e7b1cbe5f6eb9199cb68416397dc941237c195e840751c8af8a9be365b387290b249d0cd06ecbeec182842ea31a5ae9bd93ba022e7fc750632b9cc81b5a1038bba0ccc1c7e2db43874503f156e98743e803146fc1fc992d6ac52de1eebb07bae4a26362beecb18abce1a5d2f5e378fd350d8ce9f0d32584c8f89ba75e2b26670e108cfa86ce79bfe6dbecfb018e30910d36f2a13e5c2cc00b350c32572d8094e0a568bda358b385eea8d6f8bdd275eb7bdfb9e4f1a2cb54b22862f5a7813e919a26d0c3894725be199246b786e94c01b8a20068b11d44b92b293822db4ca507606151ee73eae874e4d513311795fac1670efad89abec154a2574829aa509a6ef8fd0d545570596893087f510cbfa9541feb226b7d31cd2657d820547bccfe5de187fda402521e6f79023a1f1e45d3c9b94888c5f624101a2d953051e69627c57635dac747da7478f93ef9f5785253e67161e769fd54beff280488f258fb70b12a8e24dd8194a969ccc77d41a9e35f5ef47d4bcaea8b7cd9374a4e003512feeb033b196e102c77415811762f87a7f9236fef934bac7aa0cccdc30371c5042dd4824a1d70c698fb2794b6761a352bd00c9f516cfe0d4f5c9151489b9845e99c8ae7ea952a0ceaf16376c9ee6bbb2c6376f9adf11eb9e08048f2279d2a52caa2e1b0beb75bf26b39b766a6e889e775f2e1727d87cd32424a7421f3e1affeccdafd0b99891403e8ef6aa8bf6c73f608bc4bf84102aef1df3e89f9f230af7586660a5de9d9c629838eddb61d1602750b2ada4331f28c6bb5dc8457b8f504cc812f1712903739d828bce01f46b6c57d7fe8424f3582af5d2f12414bda2f3928864f439295ce212b4e14d51529c25cede7631d6a9886c52e19569231c0fb046251afac28a0a275fb46b858e90e94237eed6eefbcf1ae509ad340af19bb819a9ce895ba56d85918d5f5e324c7242f3c48e2ca8db1d427d741ae8f8d6ec6d09658b8576a240d14879a5edfa952144cb4007e577a448e3acb40df2f29cf8efd7a3e0d3485c8c168fadab0e9a45cec1f49f8ac902684d2b3d78f94e69d62698c71ec48f1250364d924e31d0c265b29a047af1a53bc91f5d3b33756acd7ea8448629fdd34efd6418b53188464271fd139da4b3ce3aa8f9c209b0d9d478a12ee0011a095826b58ccbe4e0837ea414419e6e7f263be3e59f9f7a77cc630e0983f7d12de543b80ab4c7f1a7f903a1bf64a0dd5f5e740589b50500ea91b9ea144b7df6b33be68815da106d347280664527017f4177f9a2193fa37596d4253b9e99fc6e1faef2683ecc9f7dbeb7d4948ef67845f8fb602ba0b93d59f7b8d7762672a224714e1bc52cd5c2eb9210cc7b0de4993ee3e60a5c1592de2a415982bb2b3aa1f597720580d3de6b6b833c898810962b231dc37cce95dab370f43daaebfcc942c29d5291f20e67945814071338040c91de583e9aa46382ff80c9d8e5bc502096e5d291ba31a917ed783636326ed46ec72574356344e8611cb2e18dfd7a1fdbd27b0e1f3cdaee6758b76bc86b1914a885980598162b519b1695675e9379f602b8a0a1f95f8f5c1fa579b99eb3de3dc3b51b90472426b625d7da72e31b5735c8ba9351aa95e98ad805a0a1e5531ea1ac11e41da725a161457783492153060736d257de8e2bf74a618a6135f63f4208dad7f14e9f77303fc2c6bfa36c6841a27f87589eb3b3c06bc3a68c60fd0d2e9f528b864951158111e4153312364319d6d8938cea9dc919226835b429c162bfca28911b5976e60a7853fed19c0be9c7262f6e3cd20688c3b0bdcf5866929573b7cf690dbbc15c830129f233ef15b44009c5a145b0f2dc886c92f03b03b43fb1fdb4675a9a1b65382be821dbe40550d29c085a1e3963e3b8bbbd4c54dbf198bc02936c90b775c051658fb71dd69b168da18b1dda0ba016b16b566230eba3a934733fd5e4fe17ad863201751e20175d1d57c75f7b35ad00b2cd191d71f60d781e53e065dcdfd6170d21820026d5b258b8d278580477b56f4066810dd5bacffff51758af6dfa882661b86b1645f5775bcbee58d49512e429c78abc0aa59182af7e41e72d4c9774918608f0406ee4156e30030ecce48da41f2c024c805f8109cc3455699b96713f5c293b358d6918dfcd925542c1bab4a3de70f6ff5cbf84bab98ffec9d91ff72f925b2cd1ef9eee0c6d3d30c49f2e015757f0da059e565f108886faacd68bdebd47b5f1b5249581581668be33e6fdf4e5ca5bf57cad4e7e519c5d1ee9fb1ee1370f3a2e98ec35090b3ee5d2119f6f65ee378949244338bd2db15cd732f61bde5213270dfacbe4296e6beb0f1d25818b5dafba91de44efba73cc1c7c10c3a342fbb2db728d7d4cdfe94aa64b4d69ee002cc1c440593d3a63314b4b0f1643ca6c41bf6806f5aae371602bc13437b40e0d6972906a8df0c552d08430415d79545fe9452bbb8d901a10c7c9ad68a3439caca5b425882f11f93e4e37fb4335874b027d08e1496ec4ff9f963d8a9f4ba60262303237a35281d5c4d4c2701427bc704cb8ebb8d307281f9ed6a23653b59831f9bf021cdbd55488aedba6e48ec47ea52e84b59b42d522f17305ebb862b1b2dbfc665c24c9d300bafb797c5bedaaf0880430cc3334dd0d15e663e946f5995b6f7a82dd8ac1099de1fca2a314fd425f2909104cc46dee0c83c5629e1b89813c7b03fe2536b0c2e4fa1e79540bec9041c4f81e9f198e99bb2adcf68c93d7dd2101fbba036906e25ffed88cafec1e9f13548a683ed33ae30aed6107463dbf30eca22fe1d1ff8285e607cc1d0c8bf037c58f9e507ddd7502bbc03a520558cdb4e1c59950b0248a0aa5cfebad798b6bc3656c1c0caa979de37174eb1cc31615adc0ec91dd965551c50085dcb85d406066c98aa931335353746c0092d8f27d671810b6d8bf342c7407a62e629ea404b20bfc73e2f24d5111044dc1b92944d7f015dd809b2016f7371d99f5e248d01281161afebf3fc472846dbcb89193269b73ea99b221439363d39e1e4166ebfe0a10e4d30bfa33d61e0cfda2dfec0c9125699c52bae4b52b714de0d0a1309d8504094914281db7834151b1db020f098ae0e339532d410bdc6eea80a2db89ae2e72a588cee2bc0012284c5bef9ed14e44c257f0b40f39b9f824f182a0ff6aedaa3c024620831ca91110de9e875c89ba9702bee2ae3423b10edc51b0d3b21406489d13c8f46b99ed2395faa22d6b9a5a9c9d4c1ce3906056ccdacfcef5b0b7fdd38671f7b45538fbfeee6474f31aa7c2e2f7030a181eab755ef95b1003a7ae5ccf78064ec3afa1b6e52ef88e7a88f8e8be727d528a5ced3557213d250c7b3f591528650ed672ade3e65f8a18226b395eb5f60dc25cda431c43c4e244d35e3bc9b92e4899d6d0e31cca4149bd770c02b27f09c256f1c47725232ac15307a0c4c1c75ca3183644f0858156f77ca3e30827343add624ccab652d16e1c19d51fad0e36c7849fbff2032cf9bbdee09f537366e4b5af13f4da13296eacde60310e3a7190b0d8fcbf1b72fee19a3950e481b0b62094d7641eb7f92a4868725172b00ee5a5600603e1f67f9af48366a72ff8fe9875d9fb08c5d0704bbea255eb3f887bfbb8010162bfbdb096ab03bd26b5c8098023b40db450ab0f72f8858866b9c935f5a78cad9272eb58ecd8a3dc3454cd5d54319710dac9f56e5209cd84ce0291f18a1b85893d2c3c845605744684ba7b0e74856c137df6cab9a0a6c52f926f53a3f8a6ef6af1717e0c8bc532a4d2dda6725b914618acbb7e55f2ffe74d4ffeb6c3aab04ba629ac7b6ac368fc94a8e54ad5b3cc8ef16321057a4a64b8192c480b1a3ffce3ace67cc70963b7d6477a49d3a0ce7f592bf92a44310fc4a5c2dfe991c869e2a99c787c825037240908f924474717891f8c3798c15dff6b8f5a4c096ff1eb180ea158bc4d4c710370c6e694de5f20943e030ece9158a8462f64e01191d187a9f36a74a372417aa426ddd0009617f28f08d23fbd3e573c08123aa6d622bfee7d357ef6c742c768f1e37aabf45379fcc5b1fd6fd0cf924077752f414f8246bd222ef3ec645bdb72a88af712512cb6fbd9c3f63be23ebf2a947e4f4edd4e2719009eb75113b45846422795ce3c7c6c3feb4b4ffe76acbe6b7b2294c273b3649a60807209cf32d91ef403e8ef2de3349316ad368517ce53461730d32a09e159e246a7a226d418baf1f7b9b6df1099e873d9a97eb9c0cd341264abb11c5136c7ae964c1c87fcc717c2a37416f5a25fdcd54125c5fcc41ce20f75a2a6521d27017026233e30a9b944a692604aeddde6eef3abb501c1e4568ed93402b98f0190b8111313b8343a50c58e2d300620fa8481f5febffce9e77881b7c04e82ceb13dbb977614b0251b2900e2053a00bac42d5ac2283f4e3a499a267e10d3a90c58d59ca57160816dea50cb270eadb90ae6a8c3f4a5e6846bb92b86f684343b42c5ee62674b40240d00cb7918c4f6432a575882a03370acd4075656e73fedb579f1c493c0dd74a2b966c13f105cd8568c1b6ae1abffb95346ba277b3a38e22083effa2febb40704c0aaadf8535a9b3b6b382db5b238035050f9bb6b400ab70521c1755d99be8de90f660dcba3fbe38c1772aff82da248ae0ff021096cbbfcac296d855a57742dd7d9276f702caf555ba073afb3f8fe7273bb81014df66d020c37b94d27acc2ef6461ee2f22dbe2f383e29913d7fd8c863a96d248f7fb4e443276a54d8f4a1d74148bb4d1c0c39af783f4e3b28a63a2ed6827d9f16bea6487b82262861f1fa79240a9b8390b892c48e3c68c70ebc84e06b0787cf73f9c45aa03fa7b4481071ff8369a1b53225102b34857e238cc6a556eca8f0f58740d16244984af380bdbd11f4080dc2ccf5628934f7c30c38d23383e84b2ef697c793a2a2efcd7f9d042c8e1bda939a0a7b2b386fc063ac971861d9fe4cc1787ae8fa9e9bbb3f9daa0f68a4839f7d2bc71acc6897be53f9060fada5c17c86d2515a908483c4caf3163548120d8e75b450777910ce0730163ca7df068479bd78c55346304beea7effddbed7760603d3b7b654e72e1b93915edddcb0d6ae5122124b5de905e519869154898ac4fbbe502aaa2d9348e1d4ff0243aa0813d59c64737a859399711de808a8c711bec6a2695b223c25162ecafbcdf9dcc377a7bbb53437444650f29559336aedb4bd008b5bcfb595876929923cc739de66f88f61c5a9c5a027ced66dd29fd02cbc56a136296084a9deafaf88d9ccf0dea93dfb2d266135eb8def6f757814c902083b49f7cd9626fbba3d20f8c0ce5be875a0425423ec5bcc87d2e49721ad8ec4a31415dbdcf72ca2af06b8ea9b39afd8741f76894a8e9ff0084688d07bbc18ca27fc9f681f55c7e12863bd2e5365b502d77d38429614f3bc00a05296416cc1c4ec59707d69cb6e6d3a6791482a372293a312493164b637c8866420566596c06a7c8fef8b0d61959112fe070134093f4952d27deea628d9de01847e0750f3596b2fb4bbb5f83e3c01844473020cef54d3a2e3d4fb3d121c8ba4804f4a1fe86ea02fbf7c85244367b29c6cf9b63eee9186099439cc58c5d553591589db575ab2757329d3a2c830cf034c83c78af999332c9f1cf7fcb5cf83785febf23883ab372862e0a5951696b9d47fec120bd0c919c22475b51ba8e8375d459f6bebb005b37b63dc3d9e4727c949b1ca121fecfee9b59abb6ccf66220c93f3f3a2341a198b2506f38f3688a8d04d7e709af450ea27dd3167581eb81c8df816cd534b354c9cde510f9edc41651783e73742036eed6fb48d1b5c9f036a61873023057e0dfa5f4d4caaf35ed26fd5f03b31858b81f5a7101b864d7e96f84367a9b1a8390d9801f9c4ffa41026a11fe11648723b8b625e90e35273d649d728545ca69b4a10c307005390140a5dc4e66f0580aa9cf5c3cd4cdbece570a30aa394f079d713edfde1f9743746d8f97809eb4e7a1fd9f3bb042c133c8b44208ee66d57616a6b7aef64f807c284f53f7270a96fb0c3310c42ffffefd4b5eb2e115024d55743fb5877b1c0c150a85d760b3a37977e88e3a65440bb4e210bb463aea70c2c9f9eeeafa034fff6ddd8b8ecb1592efaa84ae9ce7c95a766e4a103d4d262b56ea66e03a180ca09993d8a5bdbf5b014da8b5953f9db1e623e73385e494c6e6d00a49e687e4afc3d25435838b72211728deb0d9b0bc3ee7bd893f3806b7f9a09ec59580a6f1c72439ce14621c34f959f5971946972121f210f1d9bb5a6eb8a27afe2ded2057e65ff3a04a8001819813e86845194ee679e350d349caf0b79f6f39fae311d08587ce1b7410fc97a28c4d2136033af92966a8a001e5474accbb1a4ec3d6fa801bdde71acc972a7b260a0fcb60050e31a45b1112c9e674cc64b34011fce2f9ef8cb6b4606f51fef73c7553aa0cd633abff3389efb1a19bb64c1fce8ed45c06e94007c44f0f6f27f0b58f8f9c4973542cfd7c45d85e34f48808a0b7418157d75e517cba8823a87cbd99665fe88633ffa4ecb088b3bba8411650716645d3d5f9f454fcad3c55d849e821160d817cbb23d5e39dc937379c0693e77a445907fd61d9ea73c7f70ed1217a0e3e82a637c84bd30256de39a9d8b8809c64ff6967211ac92d0f5b5792ef081715cee6e16bb4d0c8339f7191ba851d4d1f1896e42420aa44ad1f8af20a2591671744f50d7cdf24d981502e77fa12ee72e3a5342a159cdb095c4910cccbbcf50436736c3af831d321a129cef1f210070d2a6d65e891ba5b49c5ecbf786a4a7cd2eaba46d7351d958305d4e71f934954eda9aaa405188c97c1f08871f97335d02c52c8d32f3443e251307a0fe206aaf9a1377a5713203debc48d5006d2fa17a16c8b0f678585e729f3c9eabc8a44da26a84e351054d6f33bbe38585fce2113a931d4b4c0e4636d924cc30d889e3114ea37f16c94ba790fc9a5072947a7f5b05d53044c14b91046629bcc388297748f66dcbc876f6d89499a5082688f2de6398c4f6ebf9c1cf05bb40917776a8f1477000699514516b2bb7117207cc8c8d12bf972841131abe4c94ecaf99d3f56e9deb7eac26a5e8309f01fcc593fc5ac6a02fae587a70c73ee86ad9b4a4d12293886e113de5546366d90f9c310ab78877ae3dec96cdb820f248a83fe03ee848d5500a54aee2e0414205d51e8a37a1e0f2862c6a4a6820f811924c558c1853eceb509b7dcc84dd940c9ec34b0944629bd43e898513481c663f0eb5616cffbd27f2349ecf65ec200c33d0e7d5eae72b290229f5e9a92cfb2b626292310415bc84b67a5c2e0599430b641fedd261c6860ba40a5c637f9584fc95296503cb71e0aef4231d0a5023dc5a445e35d40db881a3540d9ac0eaf0ca73582f91d3c66c37638b9b869fc82a7dd37d647bba174eefd22f5f5ac474ec0a923ccdaca5a36648009310e3f02692ca49d118c0fba3d49bea1b52b44f2572c89006ced660939b4c37ec82664678e4e29e1b929410acad733000b088a2371c60efe1faf24613170277c0fd7499816dcbcf34db8184eea0350b383b2a97cc5bb885ddb174a4e676a4194a061bc45c795202d350ecc9c44813535e319821b1c205d0521997dfa7aea94a5d05da0cd0917b41a6b2cc710d2209970982192e1d4d70da1bbf1fa3b27072eaa1197c8ea35fea5a6616ce099c748114624ccc136850b3b594f27227f30d8860b17d56dff6e2b62f0381ae5b0f0166032bd23d35e1f66ca7f7b144585d28eee61d5dfa6f20b03cef09cdeb72fade656af5afb2b46632ff5bca3cb19adf04024d6e3aed71ea0ed8f5db0fbfade8d8e22873fda8274e5097d3b9b35857b32abe9eb8d11b046bdad22dcee2c372eeb5deac1541eef1a468ed5028f06824f26fa79b240c682edead17122ab95dec707ab94b5dee5a057e6d6fefb6beff95c9d3909a610f666c9eb7d1d6d0ea1c29c5f43823a80ba11964257514bed92789e2119b783bb5f0c4678ec2bd1390e0c29f3d8f8fa9852d18dfc85004abd89313f3d5a2a686beaf9d8058282a5748ccd90a01f72158d56aaf6ef973ac76d21055b21f8182f795cad5e0c2974f3ce6eba9e44ad1ab327b7a90ba9751ad9a0f5847bd6eeb5fb70fe735101562c56fc3f7b0c3ee6e60dfb52c30872407a1c41c0c11f3235c9048fb7d8973f8ae6db7356d7ec5fbc11adbac65634c5a70b6c5d113fdcb90548f7f3e630a307e349150b4512b3b0fcc95b69afd70ee40613cac8a0da6779f3b2c42723c84807fd6e013bb735e2b1fbdbd7efb24ff2bd37588cf98270815c5ea0f407fa4a4ebaa8d273429c0a98d10275be026ff8ac72d3e82a3af48e2bbea0b1bb07039ad4f682dd37e3f4bd25b7c50c668255d4657889cd32bbfc74fd34a95555053302919b94c141d4177d7e7653c1f9c2c93474e65a3b971084b35779d9ad1b58156296b6b2ce0d5681b27eac96c860b71ea8bc1a1a1203ccb7bbdc73450a16202574276b1312c0ff81801050bbcd3deb6ff227dc17ee105f929ad7aadf5bf08eb9e99b1f594aba0a2a423f28128f0905cd493ab8e2f87c7caa28ff7d3da5c7c65e2f8c7982646577a2b1faa3237aa4afc2a4b9d1a89a7d187c678abd9bc10fca9be94274515e0ccdad8acc17a41871528ccf76809848d9250457cb866d69d618891f1ea6279b1a0d6f6c5f93aea23cc98a32feccad08f2cf1f4737f98f009b9e6c4487a86c31f1a846b174b72a52670c71b194b5f6cd39e02711434fc1464b56a3f084c111f5da5ad3c0b32bb93d6b629e7bec8b5758c59e15fe64fdb9c6db8b30f178fe90ee509cff880b96cdc7f0b9907fd66de5134e2a14ee0a93d7ab565321ccf137fbe0c614482d79f2efa42774a9156f3c19c92a28e7d9d446d953d1b32caaadcafc912cb64c13511fdbc2500982b40ce2f602fb62bef4c524e5142a27f820e572e0523922464df6ca3e3c1258cbf40fef09475d2575a5a66b0dbaad96c9530036c6f11b54cc589e427096c2c5308c151c689fc4ed83e14190d0b687aa84207151e018e0882870be9f9268c50a6fb807d24dae24f6ff5b464dc0c454175b9c9699722e175ae1a76f98700cf07e22250143ed60bd1f842dc5fba4ef0b8bb83b4308a77f804a67ecb649cfb8dd95c4f06f4f1640baf95a585b62c718a0ac7c1577d03e7ecbe54ecdd589361d23c2ccd18866a8677e2096f798c4ae751a5480c34e55e591f587fcc75429daf5bbf39d84783c4d79375322e17511cab32d997e91bdb9b4574c15d6a74162b386ac8fca139da73b09e86e6871b162dbae2ac85de95d7beede2b223cc892dd1a17cf7f2d174eddb7a9f8bdf488fe34b5e285ad9577c0bc2bc86a9b262489e2ae6ea8cadc4ac4c130931101c65e21739646e5c2b737c24ab58c63407d14ef6b192eb3b1dad2fccc2924e1d320f760cd78a2a587c398612ba1e2aa8c80ae50f8f0b17e19ff2cf1ce6e2fde46ad7ee5ee785ccc172b601c5b9da7940235bd7e096a8a4010fde2114f3bd3cc1ffa0b2a731768e6676d9821b6e386b529dd277574176bd0ccc6d924d39c7664ddc0c52bbd7fa642b0dc69be18918ee23e341eca221633f20ae97dd29099ddb5a17e5610362019e169ae7fee2bb6ac6cbea1fc7cca0846ef496eb05cb5fb8e7e1e9b0eee9313cb297a5345ffd2734fed3a0cab116ca1e59563ee93c25e11f28de07e1d349b5ee10c7b52ec5538b32c0e5b8e93a52e167c00d47f1fef46c965bca4f7ba59484f9af1e6c9baee0c7de0b0b812f9d60f4e041d88a0cfdfdcdf0e90c1a65e4b146f4f113d55b1b2111967bbe89653820cc261160d322914882c844e68b6abb2d3ace25d30fccd90011787a94ee99b177fd8657b59cd411dc1ab3181c5754c86958e5ddb714a682c7a5521176540e8c743bd2edc2217d5c4192d002e10bb8a5a58f9fb3cf11e494c5622e81e7ac404f7dcc9b864f011e8eed2ec2cbb52c7b814da481618dc2f318f94b80042081b8475b53186e69fe573e37da27e3186ea19d814ad07e2542b3ba8be8971fc5bfc3947b7e3a4a8aff52a660dbe5f2dc3d6c43c724164a515dd8fb28f092fa66ca3cf36f7d1ea97d6eddfce323f9ba298d113681c1e4dad467fe608fc0c9723aa128270451595bd33dd10d17d41a76ed0363149c3918e31797ce783c5de8de55aae0b6ac55b9492133da745726e5348320618c6e205c01ac6d8779130bb62b4fc30e8d0710aeb8d9e40c7319b47e7683a0b9aa40bd48ca7458d167e4edd00059c0b260fbf6919c1281caaf562c3b051edc626afe0b3145f20de27c3edafee0c84ad908aa6bbb286f052c295b3dfea71887a9d23941498f85c19a772d9b6e581312c7a8d295fe4c2861925986a3bdd757d903afa1517a253361b38d73ad8905d33d00964602097194d6e83025c1ec11f476ce574f22fc780914bed0067aca77511636209d166f28bf58bd74397b8e1b4311dccf127a449f68bae31eb71c7137efe6e9f3a2128b4c21e52714383d7deab95947029441e81e8c81a56d44a7b14e7da19fbf4abbcd10fc4be5cc54d113189b801b248fc768d68fe1976913e7cf67039b55022e84855cfbdd8f24a2398df6582c342c79391cbe1e7d075c803cdf95a162de6ecb98ef4603b40ff89d269b1e5a56d6804c085dbf8a8f56f771edff4700e878de345cbfd87caea450b1415414b210943bfdf33d17db0fdaabd73e60353083bc401ea299204be2e6f60ab09782369c569592bca0120f263a5c799af65e1ffbe0a0383a22a4d2b83f24ece425c9ba9fec370b44e18f822cc7f3069b52d2df66890f986937ea2a362429e1b7253fe0fb2f75d746fa9e95af595c1ed2d4dc843414d37444c34ca5967159f16ae42222888f068dc333df8760918af7c00d4726d98d45ad64d6bb0e37ac1b39c9f641ebe8d73db8fa12d6aabd58ed479aa554a0c78ae86b0e4a189c0fc5c86ab90e869290e9f2820857febd64cacba284c401e71500f8c2fbcecc2f03cf8cf91bad6ff5ee590ce74b03ce9451051e34cedca12406fe50af1570efb11e6fac0127d421e3f30a38bf3229b4b895389166ec46b33a1f4a3bb4f3fde13cfdf5a53af89840f72793e255bb1c7905df05c01f60461faae370648b930fea3a71996195850b6520ed2bea7ecfc88aa59f8b09524e08fbabf8c71f967a127ff9287d8da58c4a88e551365f0c8545a33978ffe69ee823dd6e22db7e57001e4af1c01d7bd39a3ce7b4558bfea40396529ee2370f08133db17980627ac44b3626047d1e7d70cc9fb4ac27ac8a1699714878a6b0ef9670a55d47f913fcc16ce3f8d563de644fca5bdab855376aae39aec910a1078a3c5b03463925e1e1514398da934dc260103e4aa9dc26b83e9970a2a424d73d1bddbaed28a235158e89968fc97973d66fd67b8a84b923f98ee3be6dd010c4c4c3184b00f3f85c32025dfdcd602a5c06dfdb223ea9d69fdb1ed29487a289dd5839405c2fcc91f3f9baa98a71983a72742b6d745efc1321f39ad9f53e75adde8cfdc14c3985c4bd9d5383df0857c1e542493cab26043f14c50c80abc3ce1f12894432a406d61579aa428e33b284c4b89c3bfdb9102fa743db27815e6b8fc875146ba14f638c60c49584407bad8072b8459048c521f260fe31270522b2577f1e9a79aa61f1b180d612e34ebaa666ae84d67c14f9cbbd8ffa0472d3793bc5e5efcb2b002213922c5ce34b72cb2f3de478b79615b8a0e2c4a90f5fb9624f4ae87e7e03a677dbb695bbd755790ce73e8558a721e62cb70192243a5ac3bcf536c3b18225a7bb3e0a61357965e38eb47d73301564b233b9b94ad4e9f374b6f2fbbd3cca467eb0917db3107ce1a21470ae8c3ca7e15b1effa6747df65ea1cb42b6a00628aaa680873d793e4bb94e04439e1f78bd2d08361ac2f6de501a6f0a002b2a6cfa1fd7f81f08aae99a615ce3d5517cba6c35f54a56b2905b14e1a467e4b1fbefa3aa809434f0ae5b6dec516a5928a1a15b5491870b84ca875bafd82bda26a936256d3c0016510709361efabef5cd05bcb0ad241fafce657ce9caa4ddb30b2241c63db4b6b6b98e6962891cb6c97e99b8db24e66753c7f87d45c7a59beb2a8a3b1769ee1bc902c8d844543a59474427fee997d599ccecf516e9b5ca28db184090e758b33cf532b08502cc9312d523494b1e9a7d4e1d4e67893a449454be3f18e797670ec7b748b2d1161f1d1e1463133d8772d3c8c0b0c776c5323234018767ddd20b491d8b8e7eb897317b24c82e5dac0a1f93dc88976888168f80b2493e447dd14593def80d41a0f67cbfa39df254b38234e13ede81ccae9dd26e193a2cc98b93b12b2da6a061a88eccc50c2cec608e76c256dd071a7b45383253dbf3a380f386584b24bc974851aa75d8699a50b7f1f820aaade1b19c70d707e8b5c4e3e5c75110afb0a72447ad3d9f0254dc0438bc038f5bb226a0db6854a4630918b8de2a65c35dc65a7543b68f91db32d298d3599c5f8771643412fabf23972b32670e024ff5db2e776376702116dbd89624ddd4af142339b2e1adafa00556f4c7eefb773dd564e9573500aa79ee5a060cc558032aed45e708c61823dde1de1484e4003d709368039909850bdc2975c18e5b77a809a1dec16c41d48d0c3ba127b2371c0204b19542cccd2b2996601d8821fcafeb42720c3f5acd3e118eda6620c50ee05c5f4f5a685e45dc0d520b357adcc5fe53b3be4749a8665b822b13e7ca0352522302944645587a37541e4db5e34bd098fd02b624eed43fb79bf2911acbb4be43d76e69bf71d312ca67c3672d3a8a9fd7a18b60abd405231cf0ddac603864444539d897f07c8a003da1144305cbc836bc2dd5c63edd6f394efebc9b67160e75fcd53ad6e205d8e9e5f1ecab2994e1e4fcc969308f1905a7d1134bc9b6f2006bda4ddd64af4d3d2fc2dfdbc9ae170a0be8ab63480665aa42190e8aa96130231f2b08165f7a85b2192100816e871fb0476a203b2a8be6fd10deb1320b47a25a95b3bb2cccb37cb5180387e153f38d69c4cca7346a52a590192d63c7801277940655416158056c55bd241278969579247b03710948654a908155074ed6a86bb9970a320523d5c7507e165929e69d4867d47b396411bc83ce4489a32b97829a6ca882fdd779c93f008d4e1e8a1f7213dc8e2add939fb72653fb09064c025b4f17a1d2998c1ef3ed5ba6b71aa52de692d5e96734af74c6e7121600e746e2f08ac22bd75f22cef568bb994d16007c3fde3c04165bcf1780c14ed61a873d0eb551d8ea5d0c868640ed6f8e43d90fbcdbbdf1a0d5f57985de35e1e5cf48f6e187c0cba27602b3cbf33ccc66bdc6964794ab98ccccd2018741d3cd20d732ecde82d7bb1f92962ec43116bced1acbe9e51e549df20c422997409834ef4bd5d9485fa7cd7bb6a489ff01f42742111405ddb9a24483c5105e9987c23cce5d5c8f1c0d33dab35cc8b33a283b97fb3700fa444ddcc5061b33913367a061e116a9c6bdbdc0df6fefa6b939c58833c105b420d653f0f12eff3f571460e32754fa61518145168d8afb0554e3c0645fe2ede949ee741b7c6bc9013ae80a1f909d660e6be1ea7d51ef38628e5c2be0db157df1cc6fc388077e2dac6167abf6e25ecf944cfc4a51f3e331e485e121f2f1a69f7a8f94d17d421e8acf5a1d3d42dfaf1b3930f60ba055cf118ff312b493ac130c546a3e9ff4b9560a4dcd3ffedde802e2bb8653066746750052f866b3c75a2fb7a579b802ba64ab89328175c5abfe78cae6c3059ca1ffa8cea093a59ba036a834f2fb49a5dfeeb22c50a03419988720c10dce13089b358675fabf9599f76c348909fb9dc90d4a60c8c58eac7a737bec8c2e62f42eee3af4d46dcd4e6a7297219192ac11946644ef5fee07cf1cdd1fbf771908f243334cdb8fdf591d3fd2019cc2ecf61ac8925b6f9a4221ac6a6690dc4c56a22ddaee447480d2545618c77d4b3e88d7a048c9d4086db9b11685409d15a9532ccc7c0efdb3985454bf09c61043fec1daea0e95a6c0ba6c1830c5ecb29c835f373d519e0889e00dbaf73fb2d70c20a4a0b69ccd5b436f774082340df12c88be39bce186c9a4417967ee50f1c32a25f32b4500f8e1484688fa00f334d0cc61c86fe8c9b64ef8017dae9c76a831d9bd62cf1f0b6488b1782aecdbb86e4a6f8b9bf8e3c23fb63f222f8f561eee413a28db78b05d228c3f7d3abf46ca4eefa5ec6f008bf835922fb0be725bdfdb2a003d93924729048c3b5ed1391d34cd7da6b83ecef4e982bcb655429eee5036adaa87c1e252b7b1e2105d4b3a73d3c2d76e43af01509a5ee77e43396ecf272d8882a3422f6245398f1ca57e7f47cb9e9fa4ed6593debb534a7dd24ff943e17a499cae8c3108de8d1384efe491769281e252ab737b87e46cd552a9ea757b79d50e6afb952b0ffc0b4b1682fa7de51c31eb39886ee33f4db7d58ce9e82d669e507a3788fa8a8bdd5a2b20c6bbc0c1d5253f0356913a996907ac89594e64b9030b5d5626c5be6f3da9927aa4f3570abdb8c22584813b65ea0f868d0adf605e316413a8afca5dbf5bde6b9c9598c65de4305025c9dd8744aafddb49c99683c0378bc548d85022c2dcd703684fc7fcf48c17de51deb7933b660985cc6f2f30441f751653d0cb9d1f61316ede4c48c8e7698634dd7a9acd8f66e5d99fc38dfe4f4e02ed695448319361db0b6ffe2651d1cda32a416649eeee0d8753a2a79e0141f64a2935ee2c09b2ba1864d86bc4e634e58852b7013b0f412f22480121e9bea8e0fd21fdd089469b1698cd89bb7c83d1e8e63ee397d6a1699369a1259a41c8c3bf927d30046e7067020894761432ae8d15ce840320c784cc83744a7444e068e6e714f0169c74ec622beadad96734269f783cd75c2590a7be509a7e5631f28a6568752e96bd705f00fe98a3e2dea95b0a945f989c227d50db9fd0bde22ea713582cea02872a2dff5869f8f3d5dc6d91f02fea40d05501a59296d6c6a576abba047ff6c4e2cc9cce5f0e4b79a714d0d668c383cb22aac8fde9e0491ff781a856159cf943f8a6de3925f59902291f62244140cf6a98a54b174cad07333615bdbb852a5e437689d24248cde2b36fe099e373e8f6e015e7919771234257f11c02542bc6aad494484b162e2b47b97edf927f22af7c8836efe8251ddcafff74d3bcc7fa58099770d8243deb75bd9dbf9ca427aa7fc05cb8e8b899e7e59c9c880fdc8a84b07ddefc8db0b0d4ae629b8f09f16292e34cd825e6181eac9902cefba540f59d0d04474b73d200ebc63f24d3eb8090a810a25aa59bc77387a0101844d40ba52186d5148b7c9936c2a938c96375f2483e353abf3151a659fb93ef8e444bb2ef413c96db2798dc08cd9ac9c93b5de6272c63b5e04b87795e43cfe497e58588e8933f3ba3c477d69ee1042b76f607a7c530090d520875f4a8a9e5b3b5d453a767d86ead02fc4800f36df5646e8d0ec9b0b138e52044d0a9a43cf557ca38c70f97b1105e401e0577fb15e47e3f9137d74ab127b30b813c4839d8029658c6f6ffe8bc638b20ba23938c0eaad75fce596d76b55fd8cc8f4e1b8b6ef257e511fc573b5f331622ef8fd416cd989509114db83e7f7d68b2b0ef35f7d4c76dbfd7de4b5056f40716c1765cc381b1d5ce677385adfee8ee0f9f15f5ee9ef2d4678b794f8a5202c09013dd27b275e1842e1e0b81926f38f0c9ae1e419b91ca80ea292fe3aa77625b773ca9f6bb78cbbe5b08439cbf0666728f0758cf641298b55b9c3cde80fa331e0753faad56b9524cbd01b0fd9955171cadfdba6d0a0184292699d84c4c5b8b68334c5ccf66d0e8073bc55229dcec580efa7ccccc6ab44cc13756ea7bf7405f50e9404bcbfe5a840c27a36a1ff520d2758c311a452cabb310554a0afc9cc68af3f20dfe75dedf5203f7afa138032764e015fda536a70663acc0ec263e08e50fcefad60742115bf05f4744571b09b246bd6d9c0df56d91f7fb6ee41db5b03b5836b26b4635ba6ed768c68e427dd416e765037f116362ab460c6f6cf23fe744e53def1c58632e7c9f47aeb327848a6e9769fd13fea7da6bddc37b93c298d9292ea5d96cf3d65ea7936025c0fde2eb9e250978130e1b3e699defbb17b8783cc5ae828f6ae5bf6137256b11bbd3fdf3763758b899b096eaddf490aa79b75d42cc8628e4b2d387a2c0b57aaa8876628807cf6be24fb1485f30d666c5286cdb0645829d2de2b605d4c3ac68e4f20933c7761a27103da67124fbc449c78d6dc791ac2d2f3dab4f6bdd494cc9b54f3161218e145cdde70f94ef1324a19837a8ae42372a14e3dc29530ca6e13b8f86b51fd1f4a62e898e6e6c10fd7c83ae5b80913b1a0f3a25494adbebed1068ae436434272a732665942482c2a25bc7913236d54677e641f2df70830eb27e6d4d74755ce94a6a3ad7cdc39d2a66e29c5ac701f727e33848f2124bc708712d031d79dbd6df1fcce63c1e12e7a3611bf22a043a043a3c2a9d900f121befdc406c0c31766ef1064977b07e6b57c69b3d86fe8b78d519ba31ce987877654e7ca52dea50763d8901093c610bf37c274b7071f2adc6481eabf99a283989d26685211bd9545d556faeffb06aff5db6f19ef32c73dbebffdf80d7e24caf0f2773d279035a737b1e54809a2cd985c87ccc26af6ffc06e2a07d8d8f24aa65925c152869183c5fd885b476fd517968cc71771f23d09f599d1f70e64b955dda1d8a4acf9221c3319427181b4c3e77bef56204389d196b212178df8c51ddcc55cc81671a9c430a91c998ea2768ec57b2a68368be2dee830b472473ceaadb3d997becbbb446c9dd4007e875da2ed3bf4550996f9084572ac7d8638ce157b0ec94cf33be26003ec1c45efb7030c0c53f467f8c1e0acb25d0d304a7b5f2ee951ba35329c63fc1a6067aa2170cac292f857491fe97a73717b20bd41778989e6669d95b6f83c68d498801b2ab0a966d3767a1195c86107079c02e6b0d4a99b10e85511bbe5773ad752c9817c169206393679dc26bf8b29bf4e4876f43fb1e9923c09347baf83029677d39276ba2a82320d0e1e155fef551bdd728d51c627c4e7b56e8bee341dbb3f62812ae9793deaf10776cd28cdaa19ac31e699c3a6fdd56bc8c173e97fe523f1cb056f13ba92e23bbc616e2842ae84bf777c5940ea1f6a364488f6908465a82d3a599d685b5ab4faa7a9c89d565c44e4e6266254e668dfdf0bfbe2bb39ad3478ece2026b7fa8ba887a75a3584091218c10725ebba6700c6b8ed5476e0b5f145b021167296d11be779c651688d48d4757a6312aa0e24f6cc9f4dd2d13379706ba907975757851464f605c92529ca60099f5d34dec9855eb64541313c155893eed58f1ab26dab8718afa1673bcd3ded5e94ddbadbb99a0f0c18a3b121ce60f0b12cac6765249136d0efce97f2f1321422b6d2828b43e1b85c64b1ffd0e3d86c6fbf871bd42fb6f1942143b1c5433e64e681c38f26e2e46369ac65cb83dca25f8296c30726e64cfd1f667ac8636a0ec46dfb2e704eefa95111424bbd2724d4a42c5e30699373e8532330a52cfd0e46920dfb8acc4d5dd78af1cd046236f68c6e8f75be2bea9abd09b829870d0710a5c42162800533fd9da91eb6c487dd957dc6c535cfa45f0c1b79b02d8748876e03e2f91cef14cdde2cba155711e1ca1c918e2a73103da9b7299f59780831899c74fcfef0479c925e0705fa25f46faa7305d149ba09c09754cbf500341774945a45c71b084f8422d017a56d466ae58559b13594983cfc3ff63afb6068cb920159b5e1ef6a8029a43b587b1b4f79d062b92e9f4474b2a615e382321bdf16f9e003d467a5d8575e098f139e91cc0582f0578d098d774ff075a32e32af81bbcea049a24ade7f61c10bf5472b702d42becdf4ef0a3ba1919bedfdabdf1547865dbc0f4bd4d0120b7278f894527986d200f2f64ec66fa869296508be2c1e29d7540d9edd9f83f58c13227628cc0869367d7a238bd7b23d05b8223fffdd175fe87a2e0c1bd9e27924b91aaba000ae89cbcf7a33701cdc014d656dca6650db42cee2d071c098d4b8b566661fede8518d6fe8f7a7101c02cd375bdeea1ca72da9d48412826db4575ead6eea453fba77e2b310e3b0de381586ab5d17ed6beafd5a68796ecd67dcc3d35cc70253147a5088b3e8ca5eb144a5695947575716511e67daa2813c43dd4952865e69f78726b2c07f2a351983b10eb48b19bcaffe4f682c0ec481c16ea4e8f4311064c51d768a14ee2ddc08f0ba059022a46bf2885a4f15a19003aaa7ebbd96582d3fb2afbcd93a4ec6657f922a5476e579244440a2ff30b0c57834ff36dc5f058e58e8624cda1655caaac36d2a8d0689ed8f6f126c5546790cd904f88e0039dc17dbb6250c33d05c2976567ab4c8276398db301b0e25ed7ca2125eb0baf8561d8a5dd08d22f54c6b65c1f336bd4a72b626cb10d28e630bf3a37e9840af97fe06fa440d9ef0877225e507d0a772f4fe9dad4d0fbde6c5f1550a8393dfb9e2613893ff124f97c7b5aeae6fbbf095d57008cde75a3d39bd0886f9f95f206bd620115d6bd056047c8a0d8215d76e9db4dee1916add6e8b7efd58c5a75d00f56c9453ce8761f98df45ab7314689ecf942d888ab0ee521ffa0b289196dd5ba73c091b1988ee2403e70c02b21fb3e22fab76d7cdd33ca288ea09bcce8c3d7ec42c814c2e0ffa3c5a45e28c43f56cbaeab087b003a2c440ad16c1d57ca150305afbcfa8ef77bd90c8b02740c788189e1dd343727816d1ccb88dfdcfb43dd10bdc67e913cb4ea1126cafd6c3dffb51f2d96a3a1860633484641fda792ecb460341089a10a1671839d48c79206810d72b7df25c7ab9de9b37956cc68001d40fc9e0cca38c205d8ba2522c7cf5ca288c581aa9e7948981] */