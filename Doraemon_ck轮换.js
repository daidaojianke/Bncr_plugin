/**
 * @author Doraemon
 * @name Doraemon_ck轮换
 * @origin 红灯区
 * @version v1.0.5
 * @description ck轮换/ck删除/ck排序
 * @rule ^(ck轮换)$
 * @rule ^(ck删除)$
 * @rule ^(ck排序)$
 * @admin true
 * @public false
 * @priority 666
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件

       Doraemon_ck轮换.js 放到自用插件中

    2、设置一些的变量
        ck轮换/ck排序
          （必填）执行面板 对应红灯区奶酪棒位置从0开始，多个用,连接
          set Doraemon ck_rotation_qlIndex xxx

          （必填）需要固定的ck数量，默认 1
          set Doraemon ck_rotation_fixedNum 5

          （必填）需要固定的ck数量 默认 1
          set Doraemon ck_rotation_sort_fixedNum 1

       ck删除
          （必填）执行面板 对应红灯区奶酪棒位置从0开始，多个用,连接
          set Doraemon ck_rotation_del_qlIndex xxx

          （必填）需要固定的ck数量
          set Doraemon ck_rotation_del_fixedNum 10

          是否开启内置执行面板聚合、面板分配命令（删除ck后执行）
          set Doraemon ck_rotation_del_inline_flag true
       
  示例：
    建议删除 比 轮换 晚一些
    建议排序 比 轮换 早个几分钟，速度根据ck数量决定快慢
    sysMethod.cron.newCron('', () => {
      sysMethod.inline('ck轮换');
    });

    sysMethod.cron.newCron('', () => {
      sysMethod.inline('ck删除');
    });

    sysMethod.cron.newCron('', () => {
      sysMethod.inline('ck排序');
    });

  注意：
   1、无界超授可用
   2、自用插件
   3、简单测试可用
  ----------------------

  功能：
    1、命令：ck轮换 应用场景：可以固定不轮换的ck，其他ck随机调整（已实现）
    2、命令：ck删除 应用场景：比如主容器使用ck轮换，监使用ck删除命令删除容器1和2的ck，再通过面板聚合进行同步ck（已实现）
    3、命令：ck排序 应用场景：ck禁用后，不会自动到后面，影响ck轮换的效果，自动把禁用的环境变量，移动到最后面（已实现）
  ----------------------

  更新日志：
      v1.0.0 插件上线
      2023.6.22 v1.0.1 增加命令：ck删除
      2023.6.27 v1.0.2 增加命令：ck排序
      2023.8.24 v1.0.3 支持 ck排序，固定位置
      2023.11.20 v1.0.4 更新 插件更名
*/

/** Code Encryption Block[419fd178b7a37c9eae7b7426c4a042032a5a0e806d290eb5aadca6892c9cd8d0b4d6885db16a2342eac069461b235d569f4c8357931d88d66db4706a526fe0023109c7a6c51aa21138396d4cde30f8fe2db3bb4a358bd1fd0c83dc2a13d0d27159aa362b819947020e80d4db576f6a352703799d1ec3f5ef7a11e64764e2ebd5fe4b868ef6db2830d9da252dd3be4d3899731dc4a87acc4ee3fc2e9d0990abb384ee6d633d173b8b291ac27cf8125d198ec12a0828105e05d31b9da9078a7fe98cf877eb3b32be4d905f57ed06c76b5ff829bfbcc2e52b4c897e9dbd15a5f648384374843788575a0eb7c96ee337880028d2004ac1562b7fcf3ba5be034b64d7df07d8402ac3480e5a6a63021910bf4016bc6828ee019023f279e3e1a5a4b2fa060bf8754d4bde50d1c2bd6488d297fdb76f29cb82764af8004972b535aba73f41e43a41bda5ba2922dc1a880fa51d442319f1b4d190bfba70064852498cc8e0a5a4a34fa40ba4f5bdceb7e08b0977fb9e3abdb1c28e35014109e1298eebf417d774c4f1aa43707b1e622d38b18b65d3aa834c9882f43d03de34437d5e3c6b5346a0b3c6f01977fb0372ac98729bf9fc833db863cbe33589609289b599724d4d19ac591b2e892c0dc227f76601c81769c4bfcda44d3161457d0378e5d88202f5639fd7254bac632b8c83e1d5707b45dac0d3e3379d29e2ebcd710ccf05272e24eb4b21bb320b777d46a632ed79fba87f9e6346bff38a542502729d6fd11915e896231a851517f86e39b6c4ef46553019de496d214474a46a078b64091975459aee5885a0d86ad978aa0e28949fc21c88ecac843060376dfc1ccecc780334d9d661ddded77004016789cf3c37c74479659060f5bdf23d4b727abd50fdb7b84daad2fa14d0dd37b7f0f14f516c20aae92fd8f864d5e835c68964cc666514cc24fc9d2d3cfa9b2100a91af7277174a1516a1e1eeb833cd74938cdc74c3572a0e48bc9ec899d5ec9aeec4de40b6ec936d5feb263a21219afd47979f8f43856306758da61c3987c057cb00cdf5d38dff7611dbb0187af641f215bfe4c4d2600c25b9a879859c784be457355f4dc2850c00165ac434305ac4f1c036cdb8eb47221ba275de9355d14d6d614c3b8e3dbdb6ee7826d72144752694ded41e4e47ea47b86784271259a4061f96f33df113332ec628aee86ace0ed1c854b33399128b16d5a6acb4ac8620f635f3904af02c767a63a3ed1ecc528e75c3c3c4351ae68c8e1ff6ed470564df84d323b75c5ed46064edf9fa6141132a9e39adf101b3dbe5822aaa9ab555652145dc7d6379f4837d9167cb3daaf8eeb1c1fc4919e4439792c9566c72e1cfcd7533794aebdd58c9599479c788097bd450931c2d6fbf19eafbee958922bec2d19d906ea065d842ee1cd93f76c6f09899d841d0d616fe8188b9d9ab07e30ac7daa716e74e5a5dbee45ccb790a12941a2627691279e3b1d2a712533d45ef0e011fcd8ec6fff2727af2f14d2397fa3032bfbab92f7ce393a4db0d4d56cf7c3a9ceb135e473d7e97f501048a4a28593b887d6ce318de227d984d68caee54b0f8fb82ec71ab33c4fc074d61691249a6547d645d2e2a44063e6ee38d7a70a38d7d7bff296e4933c96a8dcaba43c975447d86505bf9962b7f5f4d5f27d9e0aac4aa802e8cd38baff0e297a88820b3b503c2ddb534e412bd7de73b0a61ea4c080ee14165042c6665290a98a1f85790ebfbc10a8393649504f6be00baf7ecbd06b3381a5d1aedbcb7eb2ac564faf49a23cf7920fdf56be4eb056e5ad2640034b546dcf49e1db49e4ca1ff4bc3e37ddccc0ead0ff49986f00f598b1ee27db7a5c9cdda0f9882124dff5b64a51e8106283c6a600cf6fda8d8e261eacf0b3c76266c6bcb80f467ce69525c34f707036728005a908fe98c7cfb41dabd49aa3cc44b0f5764cceca7e0304e3f34c88b49dea9aa7e9075f38781b9152352ebc4b4ce8179e1b24685cf8f9adacebf27569ac3476662bcea204e591ce8061852d12945b3199fa3d490ea96a668032fa9f861206cbf61d159b44f0e5e40119885ac5e1f6b18ead0e95db65cb94c51cfcd6f43f47354659213dae6893101d735d0516a6c97f4d7f034d9ed9733bc38e872e4d5dd02b1a3147519666b4e278501e2f3d52ac940b54656d3181a12a645eb4870a008c8423ed7147cec0c30b36aa84ecc69759a50700ef822b15bce31342140bb4c1481e70249df1243efcddea8549130309d3465b67c0d9250717af0bf3a4cbc8640ded5dd780ab70bc14103077eeb2d18d005f88661bc5b1fbcd8d1e909433edde744ec4bd4751106ced758bec0483f80cf54e75b8a6e33a9cb2029468dc60a5ac923917b744ec9379bb3aed0fcda90e190f338a01eca217311d263ad8b5977c64f778081c746474ba6d0f3fffaabd6c1d40cc42a150e6592d976ae0132753246cefbaa15092bab7cef33b19fc78f0e033bb5d7719213905c84d9d1d2e1c0e046880ad2b63ba8f1007fb25f0617d3c2006ee37d43ea660521a20e70cbdfb9f61c69e7318b8f22d7b524fbe6a6be996dcba16e5ec6bcc79233b83562962154f481b310e602d3c401526f792b5b7059744639adc4be033650ce003a67087b7115bcfa4668e65d1da7767bed97220ff08bb60fd793a3344b11b1ca7adbdad4f9f7d74ba0dfbe7058f97722ab458f557031829e2754fc6ef63134248898f96af765e9181bda9019af621ceca227e14db4347679dad23b7280b605293261ce90c77078d9260c2f175d0282fda541b2c26a6a848eabf079e7249a94a404f2ef2089fbd91fad65ee03e47211e9b146197117355ea7ce3e651e8b42d59e6c4f50905c456a4f08300944e243bc6c41f586a1ce68f6e76119d39219130f44647061ab515d3ddc7ad399b2b0120e52b7baf9f7a5c68775f906b39bf08cc56125f1956a17f8665ec5891acf7c72f68831f8519da8f3cadb958b8e39f4eecb310b2ecf65c94c05bc3de35d0473c4d2f66ef74901ae7038029d024753ded0d33392ce6b8b49eff3d82c1b7bd03ca1bc867178c229244f1ddf22f5ac4230073512646e5dc40096d62f5a327e89e05e8f44fd6c16d7cf9e2a73c3cd564bb21db1b5c78680626e9a8af7ee6c424b82113a665392073f5050630ccab81fa60eb3d045bb3fb26ca2c94383b55879114190ed16764460d30924de05a0e1c5978d21dcf40cc3c13fd1c9c8cf4ac460aa54c6e24d84f4ed8beccb1f68b4063979ba0d700bc50c8198ff6848f23b1002f7ddc834de67a40a1205b50441bed60cf353e1a25ff370e7fcf09914e31a02e40c09078d6f4057b08aedf7df63ab36875e7ae9ebdfead60cc52c0793db00eb1a7230d836a99a5ac6306ba05f6d376acf29e0fe3d013242b292185199d9e909189f6d3993c61b3159e6407cf800fdbdbc3375d21fc2ec3070b9467dc186110d41a33bc3af2b4b351a6389b1d69bb052c8a00ae1b59274d4efb6b0940887541b43b2f6132590a55af87bd7e4926bf689a2b3ce0e2d1cd6530c64508e57c8b5819088efc72adfb5cf9a0bfbe5310dd6c3b9d72f2645d28cbb68aee90ac1ae7cef6ae8ac12560036130c0c310789e194bd6de7be3a38fa65101342eb6c4af73e5c73da153c395499c11fe2fb8954c17029e373a9925435502768fa758344e41a6523da974bd55fa5438acff2e411698c0e1799606c1e1cae66b52851195ae367e4dcbd10844ccb3b41e379488e662853097d3c4f4fb04106fea3f143c4f67ea8617d9f4285ecbb54e49cbd115816aad200fe9019b806b5854ef58f74edb6319d9a05a2e3db8420c4623ab11a88d5229ebb520ec83688fb62608b4609d922cee601cf6ceca49f9d8efe8221265438584a1ba512e893a8fb3824651584697a5e80606f00f1e8c772b055c97dc60bf9354479de1ef375a9a4e0fc86888668e208c231aa6a9f8211562c0e94bb69bc84b07da6d18cca3e87b5cca1aa1b404ddab7c7a7fd836afd378876a537f67782d19a0efd7d998f1550c6b34bd7800647c1350c437df50bf50a4f62c8c923ac0d493cca69e61a716db1448fb879cdc57a3f4cb003f8c939578f257d1d2ae15f838ffa3cf612e2d523f854c8ede79535bddc387c125447c216dae8dfd0864a1d2f44f8e58484e851fe0ef80e70105158e77d530db31d450bd10f0ec457ac0f06a434e5c6dcd0bbc75400a6952ab2d4cf1fce9c0c7334637e7656667a0a2bbdeb1cc575b09985387c2d4777df9b88313f0887d39e4ab511d081e8890ef41297b5f0058baf845e50be4a8863bbdfa2b1bccb46595c36fb4457968ae97d26b84b4ec3bed7bcb8688b6d92f63043e9909481741ab33bbe2e8589322d647502b20f0ba04f861d434c6d1fa786aa7347138b421891336118afccd61afcc35c1e14adc51326cc961cd8411a4e3ba2930495d8a06e9a6ddce85eb5b884d59d974556c2ec5c5e7b1a14f4b49425c492fc9d419f3f978150925b94e0af66f7aa392ad45d5f6b70288a65397a9eba1c5a86dacd711aa7549ef30db66fbedb13058ead10cc3dc5fbe657124ce32a6ef076fbd59229559bceaf84319dacbe18382219431bd3d50f9a08ee05f0816a41fb6f3465f41668cd6a7a79fa2ad7d7add0d146f560589466fb7e946cad69120a78922c733bd904ae226745ae88a2008368365962963e4748865661e412270e3b0d4d437b285cc84d3478b82a94c707c53fb9a2e18286db28441280c4c299307af1256c66fafe9daf6c73715e69ca2d8b221831f73f182778266faa6ac0b00528ba50286fb3f86c8a7db86820737726f9fab708811ad32df91835ef76dd8042921037165a8e5df52322dbca4dbc0e9835742fe468897641a58691c9a8bb362e44f9dd2359c6729c361362f51e0776ae2f55b8a2c6626c603ad0b17079712445faed623168141db9d3ca7536b15952557f039e768033529fea55846c8e56a44cb48575affaba67d0800b7bfc74ce7a897c08fbb475174bbcbd8f7ba984a1d393af43a85d13d201859a5d092407aa53e6fb92814d9c58fba7cbd7de6ec743565d434ea8ba4b16082c69ef7ed0dedea7c2fcf166c0d053fdbdf5a59bba82fc136ee4b899f94d114f96d8a9f4fcc9176a0dcd5c4b81012f95ba49617081bdd64a65016ec161e28bb6080e960683cde2071600d85b3b44e086f06867f37494ef789d4ede5b0061453e7f0b8cef73b5a92430423d84c802c5ee05d9a5734dca3102869f453cfc2507cc79ba50ca71e374a444551fd35c28a87e35125aa023f107659e5cc8dd1e7aa1f852ca07fe720bd222de3fdc335640d52c3918935920637256bf2c48203c5cc7771cc38c9f312d71880d1e29af43065eda964db5b1cbcab15bf5760bab3841cff49cda8e329f67201903037b6ced02844b2f93d6f676c4e5efff8c13ad4150dc144f180e18c6c6956d750c4022c2aaafbaf436e134bc2a3f58c80ea04e1a4de8c803bc8d89037923acf005877ac94170f75e88bc100ff96d5c1992382cddc949edc12b058f4c2810a809d9a9bd54f2bb4e431e79937a30ac264c829d349224fb6e16dc53c48c1075b2d9c3032de13c0c27e898e4cb121d990810ef78bb5040861597a782dc9fdc9c3913ecdcf59c0f6b466d1b0f19607b72604c59d85d2e02bf80d60f54a117c1b5b688c27ea50364fb9ee100af93a7605464743f36e0b50825aae8204f145ea9b8f6009e5623f32e682d9728183810c5ea187c62c442f85dbe2c3b94fc5a423a9dec54292369062161c7a6f1728d0f378712d68d8fc8c0e5b0cf2ffd1c469d644041e49a0402bc7f183d82d937c6a654f30ac01a56b6f43d3d88f2da89e8e1ec48ada7350b91b83f0ae46c38b0daf82f04bc7cb6ea5fc10ed6bfbdbdce22c40e0e25132e05e1f064e40302af84ada6a3758fdd38151667f646db9c5d5d7699d015fe4a0953cac66c52ff80a2054883e5d0ef8e2fd8116d72e8781606a847d1c6f6bb179f001d471a5f1eb45c7dbeb9f4ab1d013405daaa2feac3af22537c56b9b610d6d02c389965bc9a7330e3408c9a5d313dcd561032e50227ba258345d83cde183fc3de04eedbe2c68731a21fbc040872a8fed6a8e8db8602b4d2e3958f52f3a4fe302ea4ff60b5c3c1229456a873b08e33d2980cb4846f711dce61b30bf91daaffbed978cd49832b8fc637fb648876e2c849ab6843629c41ecf5011d0df78efa8c6475ee0fa8e284a2ba871f3707a7e4245f982d14405c9cbfde445ebde2e0e3bf375c5152691ee08f41971e35be4da8b4dcc128631659508320ca4f0c8725965b9007e1d31ef5e41dd9681610305d6b07e46be4b450517b3a74ad35dd6b9d0606dadd8421c7c7c171d892d05e9afbde5ab827ea76312e118190fe1476d096f972ae0a3255293285ffaa1f8dabab6b050e42c3c21bee7904f31eb4bb2ad492e3287fc2091cd32b19ac62d49baf0644baf7c42bcf88fb34eb026bc12a140cac8c9c5fe340937180766d7d1f5f6227767f2094f35bc3d9c0c373f664fa4f8b82beed3d538ce7744b1cf5c62d32740d1bf71ee8c507e58e2fa3bdd689066e889e945877595b20d2dff478c589a29c0a3fe1229204d9c53da4edbc362498c3848961fbd4a6a6abfffb3e80f0b69ec74ea1619186c30e126157fd6f979e11c28501770c24afff683f5bee8682b7587302be29066ef6a9526c57f29406c1e9eb230df32ef604ee10286672d666d80fd4ebb7a9a3014c68021b1bdd34c5daf3adb76e3284baa103c906d296e58b72bfa617126e3617f78d5ed5297f09070ff62eaff5e5a9da8161d5ddcf33e384364b87b4561ce0feaad750af77b667079d160ccefcdd26ee0f97056dcb6fd67ddc15ed29f60b414ef6f0ca81ffce727e0120910724f043bd8b7efc16b95d2be748eb5540b86153b9f13ec83465a9e5e11b89f8cd4c12250f5f29dc245331908f0d1dc89cce5d0b384e9c5a63fd1619fea67c5e5bc081a1d7f12e1f3bf0d135656ff90fda1765f08a77db7f4c23441eea4bc6e6dd8c661c555a1078a8879a8bfcf29586aed48842fd4c2ad3f8aaad3219222bcfb6735558b1ac6ffb9bfca275c899169b4915bf0f5613f095d9804f502e1b56edcafc8f5293b3d86aace66a0dbac924344cc2c4f988ffb96c1a6a664522c26b2b6c7552005881224cf72400f6c58a3da09c36db4bfedd07766c8717115d8d1a34618220869e3358017c96697d42dbd44e17dab1206ab6f44fbc00aee4d484a27bd05638b042672c9edf76ba1a5307dd6b4d0c3e9c18c53f265708c93f8f65628261e630bc0dc7f9a7def2f527a2d85fa2081713d04192eea91717e072469e172c5c1e0e352ba6943bb830ce5f4384a13be74389e086d8f42d8ce28a92b2e2c2dee6547a1444b2b92ff850605a5c06e3180f60c81576f25843bcab287370406a914198512cf1ac8cda18df51714fb2dadc996d60ea7f943fa7525846a92afdbaddd262aedb85bd1820fa5d3953b8d6889d66d253a18e30a58b48a49a5b0fdc56fd4e0c8beb1c4e6137665f64c701ec80824609d4063bd12d82033a5b1502a7afe1e17a91d46964a4d83b547840f1659758b49c2f04af59f9886c468d7a4c91f39e0925a0856efe4f02b35a59601b35a18b2d2fa617fe01eabdc69bcdc62dc9dc65df2c27fd64bb008c32d11bfb3deff0737f965b5c4f0285beb7c53ea254d3797b48fc714f5452274f56dfae8bf83730c071f45966c404f979b37f0cc853767df6d8ca5a09c199d7b90c94e5eb156a9d4711a200d5673d526730621c347853c9198e9918a181c62d7d525affbd69d3733fb8f0798f209670e94a79db21a8bb6c4f67dcd62a862f4c3c53c25bf5e814bf054496745721863070c739f492f8d3c1bd434f3904a146e818d9a8b95fc70aaa56d58715eb59fb26394e4a7535de918283b806114c23145039da8b3be8d75882dcd25deebde6c1451fa78801eb1d01f7f33a6d8282fb04db5138c187cf92d7f53767b7a89dcbbd99efce8ddb632f38ff1a03023f1f7c01d0cbd5c763a23433d761a1d88ca30399502ce428b82bee613a9fc71aa15c6e35a88f3877a48f10608b4ded8552b642d984603d81e33bbedd67ed08077878754c814f8630042d3b8f9ce92749a97e3f8a066e28756d36cb7f6acd0c29646cf9adef56bab7702f746f5451f40acd18098945d733d6b4cf35be33f0177739fab80132ed533e9f01942bba3a121640a04d4429f04a94f42f980c97deb55521e33f1402b67b005f4b01097df2dde] */

 

