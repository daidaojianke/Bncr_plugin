/**
 * @author Doraemon
 * @name 青龙配置文件备份
 * @origin 红灯区
 * @version v1.0.5
 * @description 青龙配置文件备份
 * @rule ^(青龙配置文件备份|青龙ck备份|青龙ck还原|青龙配置文件检测)$
 * @admin true
 * @public false
 * @priority 666666
 * @cron 0 0 8 * * * 
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件 和 public

       青龙配置文件备份.js 放到自用插件中

       新建 青龙配置文件备份.txt 到public
       新建 青龙ck备份.txt 到 public

       新建 青龙配置文件初始化.txt 到public
       
        内容格式
          面板【0】
          export a="b"
          面板【0】
          面板【2】

          我是面板2数据啊啊啊啊

          面板【2】
          
    2、设置一些的变量

       青龙配置文件备份变量
        （必填）执行面板 对应红灯区奶酪棒位置从0开始，多个用,连接
            set Doraemon ql_config_backup_qlIndex xxx

       青龙ck备份变量
          设置是否开启ck备份（默认false）
              set Doraemon ql_config_backup_cookie_back_flag true

          设置ck备份的执行面板，对应红灯区奶酪棒位置从0开始，多个用,连接
              set Doraemon ql_config_backup_cookie_back_qlIndex xxx

  注意：
   1、无界超授可用
   2、自用插件
  ----------------------

  功能：
    1、每日定时备份青龙配置文件数据，防止配置文件丢失，如果数据量低于100字符，则通知无界管理员（已实现）
    2、命令：青龙ck备份，备份指定青龙的所有环境变量（已实现）
    3、命令：青龙配置文件检测 检测指定面板配置文件是否少于 4000个字符，少则，还原初始化配置（已实现）
    4、命令：青龙ck还原 读取功能2中备份的ck数据，会去重相同ck，环境变量中存在的ck不会还原，反之，还原（已实现）
      内容格式
          面板【0】
            key_type=JD_R_WSCK;pin=xxx;wskey=xxx;
            key_type=JD_COOKIE;pt_key=xxx;pt_pin=xxx;
            ...
          面板【0】
          面板【1】
            ...
          面板【1】
  ----------------------

  更新日志：
      v1.0.0 插件上线
      2023.5.14 v1.0.1 日志写入位置更改
      2023.6.2  v1.0.2 配置从数据库读取，配置文件数据丢失时，通知无界管理员
      2023.6.27 v1.0.3 新增命令：青龙ck备份
      2023.8.4  v1.0.4 新增命令：青龙配置文件检测，变量与 青龙配置文件备份变量命令 一致
      2023.9.11 v1.0.5 新增命令：青龙ck还原
*/
const ql = require('./mod/ql');
const Doraemon_tool = require('./mod/Doraemon_tool');
const QlMod = require("../红灯区/mod/AmQlMod");

const fs = require('fs');
const path = require('path');

//插件入口
module.exports = async s => {
    /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a0420314bc7da91b63fdc5e2fcda2bd7a0f16345ff5f7a583068779b821453871e8c900a76f8dc7a5c35e848e3d1831a9e9d879be558c57d034a108af35375308657d399e26fe2a9e11de610f2f4bc70727ad7dcb42cd2d8ea8a6db3a83b6fd9ed85c7c857f6c3f8f065a4dd87f279b83db36a0cbe57f3a7454de5b7dbce5ac605c9afa619f3c52091599648fbc40b10a495ba6cc18d43e265aa7046a288aea4b24b8f3baf19fc7e9dab2f6a94d4ebcb600fe0f6cda5bd16d204fa580dbdd695a07d72de87cd8685822e481cce8c7b53fc13628b931ef46ae046c7aa714ca4f1a42c0d8a4c28dc82938ec8707f9f6d28037381d04dd356a5cb6d5d900ff375dd177e6353b845df8198f829f0f60518d370fdddaf96fbcce56c45a0df2895f2c12622099ba1c446f24759ac1a0c0d82aebaee27bdb4cf239d896de4d6f3230eaf5cde6e4d88279d523e37753a965049afc3adbbbac5934f8a2df9ca886050dfd691cbbdbf1f7f47326a4972247c81b0f4b47cf58b5ddf23abf7bb14bbeb13322c2509f4ad221c393a1eee4981534708327db2c89b8a34ed584abb569a418834ef9d6d3f617014c5cd71360ba3a5a6b8e45f46cd68c1246d05e8f3fa8c1c3d9fa882b97cd30ab571b6052ac1d3b8c00acfaf13869871f36f5a2c3b27a1c3b1c6786ad47f122306742ee9223cc8853cf34f1afcc8b5d516ddba668ee3b8f8301fd21f1ed9a77ce919dfd21392132dd7128d0cbd72c2064582d684dd4e6c33b9159cd6c4ae5e409478e5ee3e8e5adcf25d637b218f30b412540de25da05379c4ef6bf3607712299fb096617ad464f2daec8388afe710ce49e7dbe0c285c4a4dd0849219818ab2a92bfec26e6c2aa15941ba7e3188323da3ac76bc0fc28fbb9eaa6ca7e6b739497dc595bba71b0132d4b1bd8134d11f6e61c8f181d71d84031b443ba2a9d8f672f04ec27b2848e703d7ed00a319d69fe08f4d77230066c1edcf673579ee494eb81e493185b6626c3a4faa021ae9c74eec12f12a6ce9f10a603ff33b7d2cd2d7e0299794f71a8ac21d184c758bda28db4244169226efc5f89ea60fd701177775d88fbebd9f64f46dc168a9730700893445304683fcb969e831b0741e51afa81e1cc4c9dfd832158691bb99bab1e2b14da45a1d90092c0ae688bae2b85e3b391154b019938609fe81e64ab3df15070fcfdecbf117f6913e5220cd62f40007c4ecb925d2934edadb996ad93563374f26a17ba7696dce2417e692928e39d2f4e7ca5a40c5a2901aec4fc2dce78ed1f5dd6a0a17048ed07dd77bc2c8c059983e0650bf562c756a426713e5c3661006bf9ada6aa2899b8cf59395a392f9a69ef1ddbcb27d4461d3f6e3ad599f0167e0a3fba1b549c1bd3f86405bbb8203e83a78c50812bac14afd50b6ca7efab42bf42c243e4142f0b4bf7b36fc96b121956982d054ddeb46e82f90195244a991ab00525892280d6ccc67d629e9b2148ebdc9ad36b5a1cb91c3fbc822295ac5c4f22e691168291023997c50fa4425c898b8351e21c24e96849751e9935ada7f0274fbb1682ae1ad38a19d118b39d839708ad856442d802c3cf3a38d781f2670748d8547b611214ab127b2d3038e685c44f51a81d4f5638b2b5655770380ac22856097a002642449e536d6f318f45b6411cf5c6cb92e46581ebff12ecdfebc836c8bd18d10f67acd2e090335a7e526539ec0ee1c0eff214d6b4256dc508ee4f7ee09f28b50279bc3370f6485803a130e763344fc4009586cea89781d9c91124e7f26959f1789d4aff01816213d6f81c01a5e0414598b22bf41f2e6f5d4a1c7f43fbf66c0acd9c5036ab3507f36cf2736648eb76cfd703267c39ca4baa7430dcb1b3e5b558c33a9e0e8d9e4d078a96206219c39056a79e5f78d48bd1895812c7c28885d727e28d06e95cea023203afccef3d334f70549f72ebf6e166767b21b93cfc64954ed7a6cce1f577ea85422b82eeeae5e34402a994c6c9240a2c4ef69c68cf629b18e375e7f67abc803b0d58916d5858f9f31c2c0de7363c5f2dfd42e76714fa3f04a4d654a61e84e30ab99b5cc8fe61438202a026eb212f8b0fd2d217d7c621f5abe861f8de119e333a23ade0c4fb111e1d8ff05a094032f3f48cd81a6c3634138d57b0fd93b02300ebf4503926c14c1094692c2b8b7ef10052f9209ac850a81e65532bf900da75430442be194de8d2c853d5776df142444913d9f7fe2efee71f5cf88bb0bafc3467fba64de5901de2b5d266cf787e3536e8a369d5c12d1b94c90497def574d1e6e98c48bfb12cf3befb77f1e9f7d0f520e4f83b5887173deb7216a22562674e53b2c9514cddfc1bb637cda14ca1ea4979e49ed35c010fa3ec03ce4d1a5473026f224ddcb5ca9d568670267397cbf9349c4ace12541d9062e73746b2725e2d88f1716a69062708f54565afc958af425bba1a3a008698c2d1580796dcbd3adbd711d26e6b9c4f96384fc894bf2fd158f28ba7da5dc61e71be976d72d77aadc51e984c1f2edb9943f7057e995260b6be8752dbb5125e5d68b2e04e3b6b8a51b8669f8d36d79a2b0ad44110c9f623deb4fd0d67adf3132cfa19fdf8cc74be02ba06121c20ae614ee7b151403a6b9818d2ebb332fe534dc0fd2d1929e0e373d39f4a45e840c0303a767142c9136a20dbf70cff992d5c8703f395474748a3c86d3b4607c452fb4ce161e545d3e2c2bfde64326f71be3d5ef5afe06c1f780f4583e0b29341d29531d028e24b69227ecb85742075164e16ce4790b8ab52ccc4381b90cd86be5b0758374fa083b3d65b051c9e8d6215d9fef99384a23768139cda147056946ca757f4588d7084ce3167de480661a3f2e9bf7d595f07ca496b96364839d6b9b3e614af4f4a1b1dc27e377e2cddbbc649e6b5df1f44a3a7114e1597a4f0f873780ad6cc8f32c185c368217fcebca55ae9e00e9ec0e1f72fabbf2e0d6f6c42b53882282698e5d7c34311a5da91ffd4da9c2ff1fdb3fe67f5972d69abc0872ffe949c86ac60cc5a3152f2727f0222f8f78a6c55d90848a32f49a3c9d7c59f4165aafbaaeef834e9a4f4b10881c12b8fb20370150c04fb249bb3620de8a896c2c68672b620725c6a2f1712fb805503e4ef151739f28ca1d84f2498227e5b9b16f46b7857665b1f1b6340711439ecfacce90dae348a391ac1b844d98695d1b9c3cb3440badb80efff34bdc544d025068da637ad095e41491c86589a1931214394f0326ec8af20d0718f4f163318c741c7007ce145196a00c0f8db4f287e54b18a2dae4cd2d1690b470ad8c3c516ba4ecb3cb9a4b3eaf542885303be33354251ae55f5d4a6c795b9b4f039a459203f792cfa14cf19a928436167a546af1b9e764b7bd3d0054b301de25c9952d567abf7c4a7fedbf8cb1a6196669009e420451cad690b01e1c6793d15ec44014d059781c513a55543f9f682c9f7deef908d6f26df32800eeeb4eb8f042294350008cdfde06586cafff47acb039129b54d132eca736e9eec3df96393c4a36241449b88507933693f94bbfd5999e2dc1dd79002521f13795fe2d8169c4472c29768227c1b522bdd3485b61bf724252ae4cdf6ccb4e75a6879af09e3ff26cf6b11c8a4a73ea630be5693b88829cb7d5ef54a3264c7e087fd27b955c3ee4ae95bc4c8fbaf7e04dfa9c6de4d97c50eb9b81caeea56516fe3a665d06304555387ae39bc451528d73e0d49ca5261e57db9519e34f052ffce406ad7fb38ca6a9b4396f60024434e5aeb0973715bc76198159424cb989d7363e64a553c9e0a4a9d5819525655e42784df5ee5f17bceff14615d6da6202b1cbd61a4f0af08e15d781308535e148baee0d55acb94e7da9ba600992bd6134b6c0c1376d22f3a8f18ce748c65e42c9ed76d2442bffdfa65b85b30e19288ca5dcd44c254044f76f5ba1d8d76e9a73b2a35d54de3feecec0efb99119e482dcc826d26748be1c86a2c737acf401deccfb07aadb948c2b6c267bb2e39b1e96bcdbf32981bf798922962715aff4299dc53bba0a7a002fa02eb986c16c886cc89ef7e28601b70fa62d625a5fdc14e921f6b6cb93dc598aeaaab737ce7eb971168bdf9265ed0b55eefcccd5146c7fd2f090ec733e2c84f7c86df1380fbb6eb33c785557d66881a148f3163c47e2724cd2b7ef389a6e129a05a712a4e9f915925eb26cce04095390e2accca78fb271e601f815d734ee80e0a59ae2997e8c0c05e629d77892ac62ee0111cae68248f913dc031186d34d5f7dbb9f5c1525eaf98f5cc1672f785943b461e754c8e77773fa0ba6a33290dc3c372cbb338687dbb1245aec06e4ea6bdd7c086801689d144adc78ade9cc0188a98756dd6ea11155e6925181c41fa12bc27d8cb0a81726d39dd7dc2d3989b168372479af80cb6efbe51191a647c9138a2bb083db691addd9caf6e506aa1e803fc6794d214e9338453d6d7dc0c482a93004e1ee98a9be4dbf5af99c1e00e81fbec3506217ae8fb55d7510d793a5fda392d11b45579bcbe3f2db83722d862ec8248163df5934da9d8aa5de558e34db58ee24bedf87f8d55051ee11bf08e65daa423b54e2f04347c51ab52e28bbdc3ede7fa5ab26eb099e8b44ffafa3da43d706efabda73053cb10819bbe7194010982c38f9c8b0a1ecc1c3da55598860ab8006597a5be8a517dd848b63fda76d88af009a153df65da0c0c00845d0e4f0402bff131117fa6317188c343a41463d38c135fc0569ba9cde87dbdc7070bde79282115fb466c8f5b7aec66bcdb7b244871e4d158e865cb7c950a8fc844bc9658e3f06378a7af27808b0643be1091557f457a043679166e2ba0102a176c80f8cb2464fac1ae0a96ecaaa4d7d8a702862bf147ba9748c2fed7a4ae29d405cdb098aee6fe2d88c357d21ab635d75fd8768b17832d8e2a60c5001e5d8447d13d1ce6a7634db9157e61de8b4b65d7cea0345fba6c1a0bb8344588033c948a8e9f45190fe79380027daef6142ead804b37407e4df0fa1e053cf4638654e26390c4d4d630408e5b29805c2ddec2326db845e0f9aa74273b574b86433bef681477c3da98ecf5040699d1df56f148c82fbb65a4f1f1dfef7dd1e5090d5ef144452dc709eefcf8b26861c7d2eb4d99060c89adc7441193186a0d1b437012ec595c5aac5d6543fd3b199670f6a2b3ae650b93a5184cfdc1b7f612e1d00b493bbafe0f177b15469a2b138e233d04a693be6259b4800df22ee0bbcc197f656a2afd33682dcc32d7839b4f194b17f90b3bb89db60fcb459104b916781b7171d6a5b39d74fa1a78e634c108d266e5a5840b806c4ac5282f38a8463f3e8c56e598a359e28987ef1198d818a58a94eea695a1538a6074e53b6e8b26392592ea565f9592d7d6e76f6a45564a22250656c2540a2d28c2bb47b4442ee8ff9015725660366e3461a799011e141ad5d8cffb64c4b5a67fea36585ddf0b1dab846c06a4552ed1398581e1f8d16d2d6210d53ff14ec55334d169c5b740cced8163d9cdcde6df40d0f9eada0cc89cdf876c258dc08db087da5ba96e1562e8f14635fdefa32a0d2b7fbd6a1a7eab0e7c3fb182bebe3e88e172ac686f71e0e9065c6c93bf244b1f1b3fcf3d8ae193cf6a69a529cd4dd675f0d81f6c59c3f39ff13b65a45ba186d052b724a510429fcea1797a9a3388a6ce759fd8813619185045cedd0983fc64a9d07c9b3c061ff8bbc42e529647d4b48fb379ca20f2ef592b88dce9d1cdfaf11ba7010fed862b1e532dd347210168d9a5a411f834f95af85fd8281d4365271fe506fb3f8d402a3292a7fbf45de8cffa137dec5ebb30b9483f72a35cb53dab5a114486d3faba4e69d653ab33f77aa775af9583de73da723431c9e6aee4fc90d5679343980d3977407aa9007932d77f4df2e9442d24f6d478a60e2fa3836fec630d299dcef589d0c13996bae3de51a5c16a7abe1fe62fd6170ecd80d2095ed240fb4bc63c41e6cbba2ea50cc95aaf4b670efcdd5430b1feb2c97d2eb6304a9a2ecbcf7da90e1b671576f3080f893c91684efff6619244d3258d0e1e5968577485bd2740f0780178f00c9c79e1e9d95ddc1234fa9f8fb66cd925bf36171f3aee2a9818b976fe795890bb7f8721ebffe26b9fa38f4750e9fa56a9548b69537c35c1cee21b66505aaf4ffc47166fef6870192a92031814e9f6c9beb5017a064da463d4e5d9defaf807cea0b891cb8d45eb0733afbe6cabd5b38139e3cdaecc048eeab7b066e19e38fbbaf129092b661350123a58337a8b0ec35baba6b4d5b75e10c1140d6a5c258b90dfb823b6f591e8e4f591a16e97852e431a6a9f5c56f55602ebb9652db65342ed113a65c1fdd9a0a89a87619ccb44d2d774c776d9c9fb94f11160222b21def62803b9a74daf33b38328557fbb692206f9b477ba5d123699ed986b6c405c1d4e6c157559aff237cde393a789633d4d72360c9062fea0d3e21b03c8e8748759459d8a33cafb33a4578cd4e685d6082430612584c4773b34ea586a3646636a9eb625d47a3e26b9b2f428a48e0deb11d62828066a72be97477ac57e312217fab2d4be315077cc2fbfd473e6b3aa7a247f36c4e87368c406ee401f5fc2a48fd87f26ad794966049f375c2564783d45207b427ac5b22ce6e55f7b58adf38923e19e5bf58b434053b8d41ae11e8b333a566c156af72b8727f84873b17685c926dd93313e5c814adecc15217fc03946d6cd25b3fb1cfd47054e5373e80e32a90bae09f79cbda75229dee7f187e17e057c4c47e44f474264ef0d1aa07a35ce27417952cba5e728fa83a36096c93ba9701953e2d65fb5ace463c419249c95fc53285c2368024c4ddfadd4eb587f766a849f4014d1b3661bf3792465270b05f80567b469959869a8e2ad3eedf452743b33c5c2c02de001449f8e0ef9aedaecac67606b8786df5cddd03cef88c239cf61a382a9976d3b2f1652dcbd4bb12fa0ce409b3fbaa6457eb7211f5bba1127ca18dba73f000111c6af98dcabbf20b531a0aee25d013651f15771e9d76160741bded28005c5f4a3b190718549ac3af58bfe2b159bc1389d60f86dc529f94870296b294c760e87cec25c7e68160342e35c95dd2d66691989f5445e55ad829a88d16e9bc3a1da0d1061be99e7c8a8d74f234bb4128bebfa8fc28c6bde09869b95e364731fb9536cb325211e1002755c73033834677c238398477dc033e309bb081570d8a1f660a6028e867513520a56afc548afef72e1b73851cb3c970b1eb898587d7e48e47e8e4323a9fc6c62182dc0599ed9bd438c1b2d2b4a4327a217f9cbd7c51c294857b5761bbf5dcead4ffc26dccd6e2349f4a6ab81e7a5703e34619714c56e51d1d0477c06fde853d5038f778a19168f7319b30e7d8563d73d98e267bfe445efa596b299a4578f8aa893a129681f94559973a19c72bd0f501be22600967db83e1af8c9f37c5944f4a3c4e515ee423d275fbcd78f945c516d04f0cabd47141a558346c69eb97dac982aad1c4b44abc08ecf0c24128af43c16fac92d72fc0aeafff84c3bb73a3d830d1e9e777d31d1c8cb13830567266af487ec2897fa7f1103a9cd961e65503c1cc01f5bef3e7bb7d265f6fd69965372983cfdc6b5c59058d5d66d479b9f2fe17b7a19751e9d77f1eea3e6f0ce52bcccbba1e841c627cb254268e938b90263c503b3e0345a6c934d03290b9f99e2de788f95af3b3204587feae26841956352956af4baf98c31ebe80b5cf01411c7eb67eb6818b1cec6e67ca3fd29cc4ad7260057cb51bf055dcdb7ffdd3b1d96ed890adc0b9e5edfddb5bdec3d0055438ee680076f78cec1531b028344dc74f2537c7290bb7054c70b0923c384cb6742ffa381fe350293d2caf23e44731396d59fc7c0feacae8f45678d7a51a59493c2ef584ff3598750d82549e116ef3cf598346f40228cd52b8405d463ec0996d91fc3d1c220b36aca2cc40ae01a04f61bf18090e406c4eb37da8dccdeaf99fcd624936a15ee04cc5584a9a5f279b924653f19cf0857c37598f9de161e79501fb0d97a82adbfd969d0cee28dcde85085d59d154361546ed7fd575baae6aee6088b3a38a6ff79e878ed78455e4f3a581927cc6adea18db135064f1a592eaba3bb03d838fc537ff425c7b0ba316c60b54e4010fa74cfa59ddaf5dc5d17b064986c702721e42c4222d05b7a5643b164d389328440bd14510fe2a89f707a5522e0c71476301ba1c3cb97e11dd8e5fd1d083497600ee1b6160facb3dad6eb353718f64bc2a52d43a588be4953b87b91ae42d96f43d3790b93f55d48ab8368cce5d29b81fc9e97e5e3770c281ec740db035fab87476ce06a4bf7438c534c6b8320f1b6342a5c51f5effdc2efb6992ee0bf731ea3f6a9751b9c45fba7d6f28adbe49c749fb464fa73cbf9847084b514bbca8e5e499ea54b81b75d27998cd5a7fcf961ab7b4c521a566d689b9318dac6b9231f5bdd0fbda74460ba947884b38a0b4af2a77fe9427fbba445f6af545fea3ace9378be48e21c484696bcfccc1d2313b87fd788c5224733c8c10d1d8fb8e0c0d53eb2715b88ada63a773d0dfb1a88a66fe2220d3a469e5a67cca41aca79e08135e05eaf281b14592353893a2622b81cbd2cf35dff0020a558439783219b4e577a9ebb4fe613c7e7ed4f805d7e7f3758b3ac62f2691d45c62aff420c7d90b1fb0caaf39904208f790c90809fe5756a292439a12bf750fe53a7405f1369db44034bca9de1d36136846b20611a203b5c8ac8a90163baaa29741fb6ef58bd6828c405904e857611d662f1d6a65ef44ba10616eddc24b3e6cc49797fd63e7c676f6193c2c73ca218b182a98f815d7cffec88548566387add0a572bc5016c206030377a048dc4e8902cc24760c1bed8de519d065c8c881974b1337434f5549268ebac0eae63d3e7aedd014d8bb1c32f7670f7ce3b2b3293df581aecb3259518b09697470dae0fee99a266b9f841adf639ec002746f290bfeb8d24f99f8d67257609cc3a07560bbd3e0a178d334a6e26235066517df0a781d564cd0e3f60e72bc6f8f6ffe7e8820e093b866301d999b702453e1479d8e5d27c553e7c8e947c653d519d02d5f6b216fa9ce58887ea289bb2c4dbc248cbdccfba1d3c5be8ac9065b8e02abb6a081e7314831aa11964980847aa809c821f4e070adc0bc35be3092b70cc379002e6dfab153346db2ed2500257752241abc00927ceeb7cd9d8c52c1edc41009f9115f536f542f73d27e063258a567036581dc03bc8bef66d25eb942b9ea10e1fd54743a7ffef92c3dd2867349d018a79b7c8422b71e6519685dac8178210aa5e906249568b2d3533cb6d27063ae37550ba5e83416cf927fd728af28adf7e46331d417d96948cb658d3c5bbfd61e7488dfbe4242b796bd0427f2dd5ca05b2e321dd1440406b947b3164877e71b2dec7b6c2056199ec0e9ac796d0f09cb257578a4413ba16528c4cbef38b351b03ce3c9cf5965e2e7eb1ad2ff4782c454c62dd42fce02544319f72133f4efd84a613c63d11657642ba38666d498b7c72f2a88067334bc024ed8a170d53aabcc594ced7aaf8cd29a93922ed9db5c3f773b24a09ecc26520a78edc5dd323c8f738bf410bd3267a39069811954638c806ce568502f03bf7be4816648f73ff1bcae7584b1d750b09c971f12b75fc1612da7056707311db0f5cf3f37a24a0dd44a94613e02dffddaa6a04e2745fab0155135c5e515502e0c16527b24cac36246c69e418c410fbc90617be1f43327785a1cb1ce8f7bdef9f4be594934719a0e7ea59c338b58c00e9d21906c010d804b65f746aec1b3efb18a26b1dd3b7c8d9869409cffed8b88ff120094ffc9a7719a1492c7863462e7925d4d76e25600581f72b3063aeb39ab143d67f9ebc236e476728f6bdcf11d9f3d04ed0f126531c1f2b636fe1d15ab8317b927bba93c5dee8c7e7822fec0037ea006998e4288cd44b73ebb4e405b426e54349b1487090797ca7858d03c98c1c2d94b9f95546f502fb085da8894b3adedaf9fa1b06def8a53d82325f16f6755aba6178ca77a594d504804d011f674d67cf6433574bf9e98691431bdd7741b22e507782e3c567bdfcb0ff0edcc27ecb6308de0863b6331a7a65bfb5dc268df2b02e860c8797011d47b8f87b2489cd1c3bc87d3a456ae6ba36ad76786de2e3ea9c84b4eac5b8b0e4d8b143802b2b1edf8336c5ff8b597f88ed1d7376588fc7a9f7d1b958fe6cbc7a98f9e4936ad4c7fdde3ef1f608d7c2bbdfcbc3ad9d6ccdd498b0fc19fb08551d610444935c3e0476cfe8cc01271ba0a0fcb57ee090cb7fab4a7aedf53dd9e49b9495d922e3e8506828c6a192ee05e7565763d08af00260025deda94a354888def0ffa438601cff5f3a92b3d376159663571f297b894d283084765a76c431ed2179baf3acd4a6f7bb5db2973e34390b6ee8ded61b06d097d29810723c7bb212252badf70bd8ae6e31bb6c8d914eeed857fd1cf87bed58807aa4c15824757ea1dc91e527f8ef91c00870442cb3b560c471e62ba854cac726da9044944955ab76260b929bd11850a2229e5559976a54c401b8830283cbfd52e1b284a289c244065564377321cc4bc326fc560a78289c2bfdd9f88fcf386239541a9a19daad031dc46711d2a156c9ba4214fe3f0848d876e0c1f541b79162835c2aa12145aba4a6d1d2715f247d9b80cdd507dea82e1caab7a12bc0e3daa60f848a38c60324c182526919c88b4f908b1343cc2d05f857642c4ef96e3f65a19973ef705b376c96412856f4a6ed2cb565b9b1932e71558a22da955529b4d0b00813dd8f8a67fca2145d24e304c5f6256a8e686fc8abfd21267aaf7c2534a7173598bf24113d8dea42f97ff68d30c329d0913bb7aeb526fe2b2b67d393a1f7f46ef3f0a9b0e3985223e7bf554095bccdf438253c4ecc6850fda05187fab33799cc617a94efc8b6abf722a49487d924f092605c9b638a4647e24bb4d14bcc84d8853a28ed986cd1ce9d83777767c5b3e71f12ab2d79b9139fc3a10f180794e70efc2e0189a16e6b353498b7f1e59a7f0ca88219702db6409b3690f751d9d6321109a0d881b8db2218bfb91f7ee786f452848d3441b594c6d83ba1a411c343caeb68750e2d6394647ddf99b9d2ebd43c38476c488089ddab7c53421d9728da74421f5dcfde285efbe62819d35938f925631602491f761163d45b636543f980d1d0c21d226eaa36e2b14cb3ab314ac09083929016d0860b35b72a0e9ad71313535359d87fb951998523551e008ea90c704d1a216ca45d349a16c159482a0dc213d93eda7c63290c3e32400886e70b5d4653b2af009bbb643a4c34ca7c19427edb1375c6173514a529a093ee3613c8d54ec01a9d1286ba1347348df6fd484b518723377a1db7d09e5b190d24eab5eed2ba1aae9be73d5e35ee4f21c6df4c4541c126c7c0235a79ea417dd49a23db800ff0afd8ec749e65a7f17b4c0836da188e0f778c165a3855a7f375c557ad8190e22432ed805b696f5a1b29d8613a72d63baa1e0d8f751be351c31adf954161b1831db60b1224df52828efd285a07224fe31f55ebda33445425cd65f78b2fd40ef6ffafc89da54c73e1d8d0056ab2730b413cfbb6c1b15f588bdfc6c87fa96fc59a1ecc427ddaf1c80a2d4b18cedf2c198ec7722515e57d147e81c59bd2b5574c2349236cfe23dbb13254f2b6196c03285603c51cb0666dbc5e2354badb7a77b2457506bfbfd02b0c5ec8dfe59c69154e54995b892eeae2d228f17546fbaf4ca157f4d4d180a3bac546f7167191d876c6990dd03f35bd0255c482f189f551f48735202e236a07f172afe8dda0bf3bb9ee9911503fa7ddb2f8ba021243f1edbe8cb45a83e60680c0ce04245b7a2b5a9c4d642a22cf180db030f38e13a00ef2a543248a4936ae41bf634229288c70fe9b1e36ac2908522a21bf771fb4983dd7d628432476194e94dd2af3ee180a6172f8c2767e3c02cba3c302bd983d188dd7ef0e09a7f56ed652f9023079ea531278f4bada680a54b1cae78203971063b74de237a960f0be57974719953cd146ba5c43f76ac713e00b36c608cc28865f2651a65a908537c267ba37d3d39fb26e2de13208ee2300040cb54042e07d506331cb4e5abe0c5cea3b59485883544ae8f572a83637aea56cf973050696059829030ca58e11a48d591b5dec0cfb5c5f9126ae70e21ab985d2cbf9bf542f8512a5da5a97dbd3a2fc5c0b80a42ba6daa0872c8bdba2bccfbea3e036d3ddb5856f8ae2cfb939e2a9d2c6d9ebde833032dfa8436d8f0ae867ad71e9205dac84dfaeab0a153c6f1933779573f539fd55c4aa48fb434a613ab3a9275d2b9e53bfde017313b11913c52f269fe416fc02627adaca4b7921363ef4a81d876e5950dee7691657e8354458fc82e74b2a8097f48d27e5cb5a060a983018b8956ca040ef9ba323c60120746690224bcbf4ac33f81abe30523ae406fc7f7feef2a9a98bade1f0b428880b15215d7cbee4e89af79300f95565e031303a96307f72cccd3abac15ffec9761bc09e3f5ba2410bf662f2d8ec6038cb6a50156751becb076263f2ceec2de6c02484bceeca885cdbcc5f78dbe46ee0c0468e072cede2d1408ed21e7ace362415bd0be7f2480cfc85a2134ce5ddd7ecf5be8009e144e22ca98dd4485ce7b88287ecbd0417c1a2e6f732a10e69933ff1db62f49af2f88992b17b7ae27e7c60f05ba129ba354f1a4ea5f592aaa25ead54cc7bd5ac6a948e40de5f365c7e42ec6784932c141cdb9c4cff334870df59d6134deb9ad8d493d73c3301586f971787c12a5dff854b7cfcb9b1a12b599ca4b0e49dc7454ab6516a5b14db40ed07fe5c613c99416e7b07c66f39b2304f331dfaa41b099c2ad2cf4e719df87382fe13f11f40a978ba099433307711d4b7f3b3a5b0361234aa0e9fea9181e114529a7c052028c25c1efa80128d1eb6847a679cb5a91e1ee44907f59cb9550abfd52ab85bdae9193d6e67028bf681af3ea199ac53a8a503fdb86a0b64ba6a142f66ffffc8bf72f1a8c55b5b153eea69842b463a2624a623d551d84135dbf55e6d132017b6e8c82fefbd34c2bf66c32b3a58c68597f0ebdd46301e04d03729e0af979abeed4a9438e6ef058f443eb2243af22b12a5773caaae096df6ff1f7f129bb38480be6c9ea3b85e15b50f9a3efb97faf358e93f24e13b1a3db7f1dc2750eb91fa962d7e899af26decbf060e0961efef0d62c04724252765d8f3e6e5c0c3169a46db8658e75217bd0124f736c63e6e526704b68a08bbfdf560858d7a14d3faf1d8e86cda437ae586c3fd58140896205542006250bc9b682fe596bb02b9349bb5fbbca6a08b2e78d11510e7b71be7b9d770e07029cb5c2f5868e7feec82f61c5957942428ac296381c1c3a4cfd2a973875dfb599e41af1cc818b2cf7b745d6fc89b5f0d5a261b67d87abb52e49482d1a6d97de6623aea6aae1bd69292b3063b812466b7655f9bb6b9244d63923d018095e18cf06af19a010b6fc4cf3c98053f00e3c22cfac20a44de4de90e5af934c9ca5bb0817e898e8862c2ed15e55d89e40610b001a0951a900f0b4a4dc78768963648a025fca2e8a67af4d0b9cf507de8347d78059cfff1bd3e15b9769b905145d0d7db6148bc585671b66f4632cb04271e9f66a623f3705ff1ffd1bead4eeeaa7f332ba4935f274204fe8a7612b077cfacb947c3044731d95ef8ffb4eca2dab1b18ef6bd7983591194ac1ba60ecdcb4a3393eabae94457e137521d03eca8dd7cb98b7e7cc2aaf982293072ed707b47b96fd6f21fc42f2251e807cba8ba6a86a90ed2f0e4a9fcb30bfd96470894d0136d325d8b71706f4af86781f5aa1dfdcab828237721c6fa6988d531a0d4357c445be91dd07d07ce29fe191f53d061306ebd369a37d6352805ef9b67f1b0e2b4f2b5a259a6417fa0bb7312e8f89ad9af121e5430a1fd690e09a3f78123f671faf620ebfafd] */
};
 

