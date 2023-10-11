/**
 * @author Doraemon
 * @name Doraemon_用户消息推送
 * @origin 红灯区
 * @version v1.0.0
 * @description Doraemon_用户消息推送
 * @rule ^(push)\s*([\s\S]+)$
 * @admin true
 * @public false
 * @priority 1000
 * @disable false
 * 
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件
        Doraemon_用户消息推送.js 放到自用插件中

  注意：
    1、无界超授
    2、自用插件
  ----------------------

  功能：
    1、通过奶酪棒与用户的绑定关系，进行文字消息的推送，每个用户间隔10S（已实现）
    2、通过预先存放的图片，进行推送（待实现）
  ----------------------

  更新日志：
      v1.0.0 插件上线
*/
/** Code Encryption Block[419fd178b7a37c9eae7b7426c4a0420338a42ee633629a33da3aa2ecafe5406d346e0b75442aab903204eaf5ca8cfbdf75d0fb693967c30d46ee6daebaca1bd49038aa98b22acee6d704580f150047b2669071405bbe6101bc80facef234fdc2a0421fc00baf025b5eac53c2921d8385b5164eff2f7d8f03dcf6140964fcfb7977b3b29fe25c4edfeba608b30c811cb40e2d551ef9938c67d5102438d068501a13b60fbf99f9f687c0da453cb5aff067d3efa3a06d8305020685d148f06da6432e4af837bdc40d1b5e7f5c55b2d9bcf333681fedbe5a9c79a3f22c8b37eb6de0fa55f18fc97010d999efa2781ce33de6a116cd2f7440fea65edba39e1888c58b73500ada2b12d6f936ed0d66fff52ad3a75ad223e00b0cbdf176784ee2198a2f2cf811149291c043c5bf5f79e627c7a58fc623323f9b13b8fe9cec19688088d57e6a3dbf97fa52c912052b17f8f3b911a18ade7f3b5768aa6b138400e109a384bfce09c933bcd2aec3917a35ba733273ac3bc273a3d1667dae55ce26c11ff173fdc97f0fb3ace0509afc809b15ef5de74bd9176ac2e55139e80e5474d10f4eabb1d5218f6697a1bc16966074dcc751798310a5d2942d15706fcf2a1c85694ca20e1d045db11cca6955b2a29666825a5b37a218bb6348d515c9f070c91ca58b23ae9ae3214682c37a8daa96120cdfe7d7171ab8c0b425fdb710af4cd6f5440509739e245b90a70ef9d88a0752657336262f6aee4992b1689f01ee8c3d0cc38949fb0d173b7134d7b2579fc124e6526b46c820e028587af4cc45afe91e590d410cc7ae4f601c5d425df4f21288103683445cc4f6b31ddde9447f5b59e46141f403fd82d157a88970a222306a81e3d481aa6291439ff715fb8b3d3edb9475e7911c6bf3463a80ded997cfda6e0d0e92b075d48984568ef1b785c5775c4e38a7d74a8774ecd056bdb33b022ea83f21d75b433ba1b3bd726f72fa7fbeaf7dc0f3aa0c30dd49cf2a25fe05e256edbb3c9e372d5f09b1ba9e92a726e89fb83debaf5bf9098436f7e0e3a2edf36d68f380fe269d03431a0484bd805df320a5cde0692a3f167648292665b620c5cef1b750ae102cc1fa9b0df279fd975836ee208cd9670b0b015e281e97320411616dae11e722868b0e522bd6d48c02b56651111df8ac801b6426f0c9e5eeafb806d81204758bbbba75e73ec3cf6253061fa28e89808873e367a488cc3a2a9f45fa2ca37190cbc1417264e576fb40c4411600c5e3c449ae70b4366ba5ff60027b9776915ba191823fce9a4ace0367a658178f7eeb5f09c5baa973bb135ac304b14a4ae4e0c7e4c78dc463f71c80827d01fd5aa67a61d38d85a54fba822ae006bce94bfb54bdd9668c43b297faad504082d9e8095ddde348e9e086501179a666cfbf13fa45f56ebc11d38bd2ec7f0baf8dbd46067db1e811734d652bab6bd904d240089f12e7792b7ed600008c963db1efbcd2d657367e465ee76a46d7a16ae9efe95abb1ea45a3176193aea21e42084442370a8c9d5eb374743520d4ff863f78ed2c665655b2a7601058082dc8ecbf16c1060210bbd5e066444d55beacfefc019c31481e90f1e86ef9d3e1edb3c679252a3a41ff5b4837933980e5cc6d6fa2474db6c9926149fbde4d56fc0b6dfcbc03fb8f4537251349111a559d0bb543ee3d3f9d1912f1f37d85ae2f683dfa0c624831f0132ad6298d6afdb805cb657933da11442fa24dfc7378093dffce2437fd6eb3ca1e97e0b7a102015d343ac61a381cdc2825bf507f2980276b55d0e8b806f22e37dc98ca5eb11ee53aec8898e52da6244ca31663932dee5cd66ba031b3aab9fb4ea4d9ab6c076c94e2b0452896a618b814f7a99c0a2aa5ef8bf1db572e80dc19f91431af3fc910f05675946a29ba5dced2df306d1fedfd51949b6c6f10c7bf2f3f57964cfd0dcc69c4fea99c2a82dff8c79fb01b4c6a6432f9706548b7c018ab63d29a1e61ad92b447c10a79f63e1187d0737a6174da7bc7f9febfdea02de05cfa2ca3c5706c38647f05ea1ef46cb8691b058f23650dbeee4d538c755148fc7174574c85acf986a96e5ddd9a0bc9aaaa693ef8529628c82282dd5fef359f480dedc47291271716cf03b7bae806deec968da9e1c25c32d] */






