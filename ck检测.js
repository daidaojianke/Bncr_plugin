/**
 * @author Doraemon
 * @name ck检测
 * @origin 红灯区
 * @version 1.0.6
 * @description 检测ck有效性
 * @rule ^(ck检测)$
 * @admin true
 * @public false
 * @priority 1000
 * @disable true
 
   说明：

    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件

        ck检测.js 放到自用插件下
    
    2、设置一些变量
      （必填）执行面板 对应红灯区奶酪棒位置，从0开始（多个使用,链接）
      set Doraemon ck_check_qlIndex xxxx

      设置是否自动通知过期，默认false
      set Doraemon ck_check_sendMsgFlag true

      设置提醒的内容，默认（您的账号已过期，请尽快登录哦）
      set Doraemon ck_check_sendMsgLog 您的账号已过期，请尽快登录哦

      设置是否禁用ck（默认false 不禁用）
      set Doraemon ck_check_disable_flag true

      设置是否需要执行内置命令（比如 面板聚合/面板分配等，只支持一个命令）
      set Doraemon ck_check_inline_command 面板聚合
    ---------------------
  功能：
    1、主动命令触发检测指定容器ck有效性 （已实现）

    2、检测完毕后，针对失效的ck进行自动禁用 （已实现）

    3、支持针对失效的ck，通过无界奶酪棒的绑定关系推送消息给用户 （已实现）


    更新日志：
        v1.0.0 插件上线
        v1.0.1 支持针对失效的ck，通过无界奶酪棒的绑定关系推送消息给用户
        v1.0.2 修复v1.0.1bug
        v1.0.3 通知优化，配置读取数据库
        v1.0.4 删除配置 ck_check_sendMsgFlag ，改为读取用户输入的选项
               增加失效ck自动禁用
        2023.7.29 v1.0.5 增加 是否禁用ck开关
        2023.8.2  v1.0.6 适配 多面板ck检测
                         支持 执行内置命令
        TODO 中文pin通知 不到
 */

const axios = require('axios');
const ql = require('./mod/ql');
const QlMod = require("../红灯区/mod/AmQlMod");
const USER_AGENTTool = require("../红灯区/mod/USER_AGENTS");
const Doraemon_tool = require('../自用插件/mod/Doraemon_tool');

//插件入口
module.exports = async s => {
    /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a0420314bc7da91b63fdc5e2fcda2bd7a0f163718baa949d4ec6f8310059bb8a13420813e645da4ca591f74f2fc1ce0841aec4c41dcb1cb0416cf6b323665f82200d684503bf4145bc6301bbb8e306bc5b17c15dcd8096b6aea623b93817f65229d76e58f893a1afb18f3ce86bbe603e10ff731623875761ec4d2920497e9b7b4d7f744a3576d3fb3efbbd7c067149882b880c709ea7285dbcae1d90dd90992106a88f45883c36ff2b83977dc0cb321d294b90cf1841209d41befbe8d33b1eb2bc57a6952723cf6541ffc34a6a60a3e64319423f8c42bd73b37496e4e3142d7c65c0402e10d4d0fe18722f14d2ca130ae9e1160698576d28fd933d0d6c941a134da1e0aa1345ce5385a73dae4cbe10e4113603f073d26d578e464259f5a8b29b189ba6e76ded4371026da64dff60eb52121e79e6ae8e6dc3ebace1c7eb8cd180a37efb1d29404db96c8ec6d5df577f94f05cd6f511f261494fda256e7f784f4bc8852a2c3ebcb69ddec530b9043bd48ead6c6efb97d52927afc8d09518a23ccda4a960c62f2f84743a655ed66115b4fbb7e5641f94c1c5f8e2da9f683a9168422685c92efc724626c87fcd7c73c70f2da3d920bbaa5a63ed62183f444d26b4067dd5e2b671f2bbaf04919f1df4432fd0546ba163f7389393adfb6e0e7fb1e3f84da998c108c133ada8780cbe35840059501bbdf7ed02eeb0dcf56b2fed22e1d7aca53f92163a31aad7d993c8a4bfcb373bb857f0f422344da1ebd1454d4a70f28f21a436675764d118e03fe8dc33fe2fcfd359bf3a95d9b74a3cdea608db89548fb739ad3bb47280e93d32065329f6c34996d42bf22902fd2594cb00fd5bee64ca08160f15dd107751e29c78cbe72b2f1588b1d58ff30e08dc5e488bbd3c05202a56ad560e76705f70f2c240fee0c3fbc42dd413d286515f6089dae092e902220d53376a52b9e652f071f1467e6d3e290fe07df64b97b28389e08c9625ac1ed358037bd62880bfe9364b4871d29a0d65e42750c5eee628275c9091b5cae5253afb052522051c524417c1bffb2b6cb9d4ae52845ea10b5d3176c1c291e325afacb08e21fb998ae57c4e0fd80d44942136e4c4709aa07a0832a39ac24ce029afa8fac2d33932ff4e3aa91c69bb958fd0bcff6ac362e9a140fd598a3376f3f784558754ae57c886598fdb86ae57ca4ec148c0fafe943b4498d2103b1935167dadb69ffde36827a16fec4313fa3c36e9f601a1b3c99b3b31f100ce3e5f075e4c518c90e4ae20d7fadee954e01b3fa90bfd88d3e66f0fcc22e8ee5ac4f9c16e9cc943510b8b25d8db35a4ffc242eb973b1b3161d26e2ececfe5e967c18aade7c5155d198456080208a945446972ae1a61ddf7ab33a93b1d6859ab3221e6008abf6d3428a005732580f8bf6f82f92ec65e4db11ee3998847f0a02b09003bd31602ef257598ef507c4ec67f51aab8d6a5a5f27494c7751e071d60a15c7df6adbe8b78255b41ac46c118638d62dc4341b36ec0b1bee41c72662742f3e21c7258fe8e283a4f57c21043e3f3cdb3e99b3c036e3d1890f6307fc6b13b0499d135f532e8aff00e29cde3d3a27925ece9df588174e49133b75b4b6fd2c11e4083b9812beea88320b08533cea483c4e6f61f2a782d2070d825a160fe9e9978b6f0f6a289de0c36ce0bc05cd00f7969599bf5ccd1341bf5561082ed241e518cad446a225390807355fafd3a74eb8216f497bda4a5700ec80de0abdf1281241fc4768e9ea5e9b0670bf4b8a10bc6ff4882face7a74fe5ee1e865a6a6be4031a74f976249ed012b9cc978e6af1fcc8d08bf3bf2d2f4f8f780ce3e8088214456aabc817a37ef414cc476314e499c1332b54a5027aa75cf8e3895a1bca10271a1bdf2c012deb6fafc6b8a49e5edaa9b901eef259a8f002e1e33fe14530b4db02efb059f3287ff73375c5bdc17a0e81a15e2f0f55130053a25d47cc91bf4cbbfec40dbe75330300a39073f8225a0029854801cda05421af1b826f6bca489179082d77b7fdc023b4ac53a431d99703171e31c8013fef333abe1b2d7053cdeeca2abcb9d2329660e2f267df96cb90004cdc4cdc087fb75ba4b7ba9548084ec0f6fbbf3de273fa9e3e8c5707ac30965d111172791b6bf54c934bc991d81f7ebb250ae8cea652dbbd04a904d1e78d2c6d1cd5e385b819ce9daedab5adf9b516d5baa23fba47987cd03fa8c080044326bfe72d3b72662ea54b7c528ef1b0f46b5c3570786d1038f044b369f07adcea229c1f6a821237a17042680a525072489ab7a53962ef3ce72b8889a337d4c49ee0b51dfed615da790b8d40d2f7a94239a575fa850f1dc6322150ae07979b4bfb6a68cc4f291b3c9fb6b462d14e7ef44632d5fd2ea13d18006cd60b8872508e385baca473f50a3f5efb5fd3c43e358af65a4b561ac101310a37e6028565d30b38c81bca6a5b71689112cc662ac8dee989c3537146729523fa50028083d4e8aa7867f9bfde5ad6ccf24c7b45021078530a399dde95a87df1fc1b38c41f77896588eaad7dd95105c4d2248a8581502500de31034581c516066604b480102100a1026575c0c0e726d2ea63241b14d7cbae14c5150411d7cbc774c075d4bebf06e3afcc1a988d00520e983d078b4ffabf26f2e516bc0ae115817b50cbfcb23bb617f44a2543c65b9a2c273d0b3fc14d39e2997426a6aad9617bd7bd483a32ae56c83ddc5299a4b507aa5f2b338d5e3642f6e188bd907b0622c61c40e4fad7e8473c4169bc60ac31ddc18c1ac81e43ac3a4b10f1045a52cc0360c7c78267c24791e83a9a9200a363d7fe4b46bf1ad758c02a63ff1125b5c8de22f7150844c5b9cd618ac894ce250bebbf70650caf0b289b25416517bc0cf803788edb051b3d4a574ce865a3c00a5b3fac629e8801ff6d8a2a1e508720a56e202718c2b125b69c8fc74f8e030c978765c9eafe57e62691f4efc15a962f9e5b51d8be18133affdf6948427aed1b451f0c9132ee61b26b5834424849038c8593909ef969b1f868357c1da00449ffad2624fcc37dd4078e081324346aed434bea52251809ede855092ac4cce125971e12fcd628f8f89990cd88dbe3fd70347800578ec25868b3dd69587d1bb07365cdc6bceee4ccff983ba3bb9b2827fef19e86f0bf072957ef3bfa2fc7953d6463f28a89c354ec2675b691a9fddcd7b9a97336e04844eddeaba9e4b263b6a02b46e73cd80e538eab6ecfe752d951a35b89f31d2d01d776add913ed0402c2d563282f0290c1f6e806be6fbd77225cc5ab1224cc4b90b37e8f2461c3f51b75e76920c43237ecfc7c8a1891509a9970286653a4db98ff4ade2eae2a4aeeeb4d585b3254383bc137455b4e61f5fc6c14fa1c561069784e7a2c0cfa1b6527660c0fdbb015cc619af8c85b43963fc14c471452dc6b5b873b69622c494f8761c01b8dad41eff5dcc2361a6bf5136cde2f05519e1f1f5e087850e282f42df3453851c900f740d8742bf8ebd0e8691ebc85fba8560a723a86337abfacd6ee15d71249ed1577725bccefd38bc2f5005a9070fa238c6c36dccf8f5ac13f8b3bcd6997eb0503e2563be078a6b16ce80b070d8da91e671fb78383428f272e28f2e5dbf9be524642af6b24873eebbd800aa4e3f70b5e28e7ca10a5e1a21f9c9eb6dc4341a6d914c4a6741605447c2c28ea726ef6bbc9da0dec7d63dfd9f616c17ee7f45e3333898f9cf530f0e5660ec010b370a035c570aa386e2103fdaeabe89a8c84f3ba478588ab827cd3d17681bf6b9e5182f92fc8cbba0bb7482bcc2f638cf2bcc890920c8a6c572c80fc13569614c16e1dd1a8131586f9bd97afcec29081aca9889d38daf0eb47b3f7c323c87316f6a2267fa7f29add37e61dfae5d19c3bbdc4e6d3fb9fd254e883510e456a92c115d5ffc8e249c2193fc260ed7b7a88f63f25f908fd78d9b8a86b45ee94aa95e9643b452f88ab239d6d8ca49e197b69e673c68c947d64dff63959f524e0c2fad17f103cbd6fa4abb818be61519bf9fd79db707aa5830fbcf6976ae259078b618ab490ac813073d9ed24bc4061459ae7a969c7c4ecf89632e2cd4dffedee22601fca799c4d92d77e9f20926eb63e56003792afff26144ad7329801586cc064a8c292ff8a822b38a65ad14381f8a4f8d42f555923b8580eada4f7c95455f9f4f225639acd4d84c39983108cd596b504f08e424cfa57a68e012216de2348cbfc4fabc779683eedeadc54d20a755d6b1cf5525ba983b558b85581e57009a6865b82781ca0681820f8a4a078e627aed81ae2ac1b4918263fc5303a93af3f193c3133ce390ff6e80129c4dddecd577146f9b7586866b50124974fedbe2f9ea58cd61b43208081f7447b6f669395cf16560db327e938bd88ffe643f23ff3eda5761ac5557967c8ab246aa8725935c3930c971951acc9f5d54553da94cdb4a20761a9e401a51903e9ab28e3436afc55cee3844c90c9ff8b7a0db860f629e51ef36bf7eab140d15b4cbc8729441cf08d507643f5bccdfb48bc38208e8e5cf5cc44c1116078bc3d8058aa5153ca62c594eedc63eb80530c282d74ad415eb012b80b16c98cfd41649d42937506de84b11064c86452a97fe362908f4c0e0222be59af5aad22b64a20f5b5123c8e27ee0c498db5c7dee71322c7a125722c1e3d93049865b505f6724461184b22f0ddbb9932cfbad1a3d256361cdefae06ebae414fe277f201d1e191c4e2bd2652f330a81e0ab7ad51bdd8a8e4fc3caac6620f5eb1d7d2b64af71e63c0e669080bdc591c5df2691d749c1a4a25903deee5ad3c2b270ccca515da5a86979a43ba6b48ec917610ef0511f24e3e6ce38fba5082201378f45e9de375bb0faff56f25bee8dfd078309e4483b63ccb16005bac07213ec02ecf7c1391ad464e6a0ec59b73ca82c8d5990cf8ee986f1ea0681a7f1ddf99ce6d359aa451b8b3be1bb9ad379a1f27da8fdb110f78c1ace209262348d8e8e343458c9562d4e4d5c3ecb34eb51463d9749e4c88f62866194e69b68bb23743d9b53bc6aa6229846c9f8bf87501456c41edb85286734ebe7bed60c067cf4ea23ede9405c0b067b572257ff67fe6639733c7d5384bb14e089f3b9a1e40aa8391c747386ab2be7ea93951342bad6b5aa85211931a06227f75b0ab1ec7b1b3331a38a118b825655bbe94cd312e9e72131d2a1b59a17e4c6d89530c819dac31e1a9a8354195e135de2d6d94ab27614310092baca3bc7a314c8410aa2fa65964ea4dd24bae0d1f269d7fcda72ccb2548154bed974633e44ef4c6de3b32bfd1963cdb0190e1fccc82186ba74ba8e0d3ab926562f74a65515201b3ebeb4eb80f36e8ed7a9924f6a0224cfbda7348a0550be2bf0241bc0d8503c3bc5a86bd93c386d4570ac7e03d6b947ce991016e97399dda7147f513a7bfb3c170422b4b6da1efbd6e94f38085a77b85cf443ec1577e35a720e099101b2afbde80aa60d6247afe24a25f05da1295df8ca17b67fba6d32d7d525f39131363b3e3a619a5ee746e8c513046ee71647f8a997d46b2bdb575538cee76bdd90f884954ffc1e5e5ffac8a759f65a1473dd198784a2af1a8be59d2d779b508f9479c5e27a4077fa9db861c672b8cc0bfce71422b4e939200eed5f20feb5468f2e87464afaa7cbd8bdb7da69668ad1b40251e3f557c79345a9f4920e5f428591f32416cca6fe2aa766057f44a8bac8a1d6b8d11f6668f9a487de0883ea1d81845f81154248cc08bc6a84f043381bea252c790cffcb19d2963d297c64d734bb2815bb869f26fe2d5b682898ed6db87d26b506d9f79cb3ac27ed6ae9e888d45da30b13df7509a61d88d819e9a5788b7d4ae88eb22a45267eda43cba556a5f468ac483a4b7eb3c283302c328cae163effa7880ac7d7f05107b1d1391e36d7b93238a6dded1ffd20b67d5d593674bb4f150179d7ac4b98354b37c1df595ab544d18e20846282187772f73aa16c7d2625a91863bb5e65d57df8b850a265390ff9afcabc22372b0ecaedd10c58d957503e7b24d526e055b13df075b1265b89dbf89b6c460e2bd3257adc4f27d9aaca197cf69ce372f88e7b622d2a5e26a439b62a30ad34c38ba46ccff6e1e2648aedd8deaa20e611575685e330d63169e13302a8033806ce9b7e901ce98e42f9e8516ec95f08d0a5551453cb9bd5b4a7d4d0e6ed4bd5a67b33b98f917ef2ed411bf711b0652fb1f50fcd8fc9039cc9f70d59ee7f7cccbe6204f02110c6799e7e94189c3690820f20c907368451e95e9a0167d5cef97daf86236c7c61e94ddbba7863f58732f03f80b1b173c9983f7a15f86b4c0b0927e2c227dfbd7bfd9bc4874c4c6b003ca7e673ca744716825fd8ab2a004454e9b3f23f9568f89facd0d6221e413dcf6a44eac9ac270a61abeee97c2d242a452979c72cfc2cea60e65a65df895a4045cd42ea5f11ba157cc630345f193a2145bfbb5b71376b303365532f7e54940065b450d61b06261a40c3947e69ee16c1ca8d8b863ec3b0d594cd2ba768beb4c462ae12f17d10035864e8ad6527c591f5cff6bc9a4c6ab51cf9529697d9ebab9b410ec2d98b0face207f15326291a9f30b5660d0b846feca37d96a9e91ddb06f97e80cc427ee3849baafc8573ea4cc1c5fdd59f9cdb2cc896b610c332f40b9c01b789eaaec1875e227700f43645deb872d2163fb0457a082309bfc6bf4065a1385c814b783a05395429ec7864672abbe4040df542596fb3812af6b82f44e89a46713782b65ef60e0cc522a301e3fa1161f5352bfa3d0b45dc95bb5fba3633b1c3140787b36a978667c79d30d5f8abf98066871e896419ba6a81b6b003d13dce10efec2200d0788bdb3ba8a19d085f7c935a51343948eaabe5b911a114160ec4de8ce9ef015b6f28e44750769953c59fbca8966dad0e634d04506079af5b1fda38001d47f787adaa72762166f747372b4d47ea80f347975db7198004711395d1421adf96d850876fa54a851a8b78c8e30ad3fac68271d661bf821557e0050fdb3f58039d8db95c527213ee9ff2f670b15235936bc9b6adea6f8e1991daa951ab3e7b8775462c786928836fb7bda7d2da43698b9bd95ad6fff176e1521fa30a6159a635a71cc54422937426d3171addf1540649065e4e98241f415a5fdf751a065071e4c28d07717d15ed4ed5cc282a1338bb4f67a1d914e3c523c6c076c2a04cf0b328d6aaa4a3a4e8a3c12cc089ce442adcabda928bf04c4d10d59901862bf753a219739abd4da777bcec09d701e879f2494bb620e9ea345bed25e9f45e90f26d373b3c368a5c660ebe973fed7f96ae006c2b64d5129cbba6dd7f19a693bc8fec218e08b90d644577456bf935af59161d703dd504ed53c2010506fe055344501f977891bf61c666a7788457195179a02e2366758b154971cc8b8698afdd24f0742e6f28d31c6d3def508d66ac97f70dae835c39213d2832b9139677be9762581312eb9e7fba60b7b0fff362b5b5fe5379fce1af4d59e12db1811b78e979a1becce01665ecc3e46d6bc2e0e659a50dd5ff32f9ecf34d34db14dc48efda9f81929e66e9277d80af2bfba332e79eb4b1142c3097c076ebee0df52692cd144de8a562311d3bbc26c45b458f9d364641f63ab62f0e86e4f9383c3b3be2453ee327746c4c0d668825ae68305f853ae505737c5a04dbd0f94e696e7f942cc0cd4e4a979c420f8478521d31bd846f26a50ad1c8745ab8a42697b7bab66ed9c134693a96d079a43dba278030d4373b4b33b1a9954b5980f367da802762e0898368be0e0b84469ab3e9df162b736a6fdaa2d413ac84d06d9875c81fcbf99d72a18292ed9038e57f40daac6bc7cc6438b68fbb7f30b9bdea829de224c0ad7671a61a2dbaef3b6976b8b48e127247d18fcbcf1a792212d25f58de401fb070c4868e41e65872195453bb0e23104c9af5aa68891228e7644c4595cd696f0eb6fd9bf3a22669be7170828d21e2e7f890504d9c7beffbc1f48eb3e1a00f047e58dcb61716b32e76e86fce4a6aa53ef03dbfef55048ac9e7768d061fcb235d2e403e78b799da67919e1f3777b5b2e8295ade812e6b866edba7c22211f99c9e75dac7e850e42f7060497742313a6342fbe6dbe51b2421b6f756583e8f008ea5b37ba57a5b0ef26257221fe6a015313eb0c314c75d1d8b27744c21e613eccd04d4a342acae075aba2d7c5d0ced13cfae6cbb6fb3b71b847] */
};