import { baseImgUrl, baseUrl } from '@/api.js';

//处理影像资料的展示
export const dealImgList = (type, datas) => {
  let arr = [];
  let list = datas;
  let tempList = [], keyList = [];
  switch (type) {
    case "YX1"://客户查询影像资料
      list.forEach((element) => {
        if (keyList.indexOf(element.imageName) < 0) {
          keyList.push(element.imageName);
        }
        let filePath = element.imageUrl
        let ext = filePath.substr(filePath.lastIndexOf(".") + 1);//获取后缀
        // let pathUrl = filePath.substr(filePath.lastIndexOf('/') + 1); //去掉http://188.185.8.32:10040/
        let temp = filePath.substr(filePath.lastIndexOf(":") + 1);
        let pathUrl = temp.substr(temp.indexOf("/") + 1); //
        if (isAssetTypeAnImage(ext) == true) {//图片
          tempList.push(
            {
              imageKind: element.imageKind,
              imageUrl: baseImgUrl + pathUrl,//图片地址
              resourceId: element.resourceId,
              resourceName: element.imageName,
              fileUrl: pathUrl,//文件地址
              fileType: ext,
              resourceType: 'YX',
              isImg: true
            })
        } else {
          tempList.push(
            {
              imageKind: element.imageKind,
              imageUrl: require("@/assets/img/file.png"),
              resourceId: element.resourceId,
              resourceName: element.imageName,
              fileUrl: pathUrl,
              fileType: ext,
              resourceType: 'YX',
              isImg: false
            })
        }
      });
      if (keyList.length == 1) {
        arr.push({
          imageKind: keyList[0],
          imgList: tempList,
        });
      } else {
        keyList.forEach((item) => {
          var arrays = [];
          tempList.forEach((element) => {
            if (element.resourceName == item) {
              arrays.push(element);
            }
          });
          arr.push({
            imageKind: item,
            imgList: arrays,
          });
        })
      }
      console.log(" -arr=" + JSON.stringify(arr));
      break;
    case "YX2"://审批详情影像资料
      list.forEach((element) => {
        if (keyList.indexOf(element.fileKind) < 0) {
          keyList.push(element.fileKind);
        }
        let filePath = element.filePath
        let ext = filePath.substr(filePath.lastIndexOf(".") + 1);//获取后缀
        let temp = filePath.substr(filePath.lastIndexOf(':') + 1)
        let pathUrl = temp.substr(temp.indexOf('/') + 1); //
        // let pathUrl = filePath.substr(filePath.lastIndexOf('/') + 1); //去掉http://188.185.8.32:10040/
        if (isAssetTypeAnImage(ext) == true) {//图片
          tempList.push(
            {
              imageKind: element.fileKind,
              imageUrl: baseImgUrl + pathUrl,//图片地址
              resourceName: element.name,
              fileUrl: pathUrl,//文件地址
              fileType: ext,
              resourceType: 'YX',
              isImg: true
            })
        } else {
          tempList.push(
            {
              imageKind: element.fileKind,
              imageUrl: require("@/assets/img/file.png"),
              resourceName: element.name,
              fileUrl: pathUrl,
              fileType: ext,
              resourceType: 'YX',
              isImg: false
            })
        }
      });
      console.log("keyList" + JSON.stringify(keyList));
      if (keyList.length == 1) {
        arr.push({
          imageKind: keyList[0],
          imgList: tempList,
        });
      } else {
        keyList.forEach((item) => {
          var arrays = [];
          tempList.forEach((element) => {
            if (element.imageKind == item) {
              arrays.push(element);
            }
          });
          arr.push({
            imageKind: item,
            imgList: arrays,
          });
        })
      }
      break;

  }

  return arr;
}
//判断是否是图片
const isAssetTypeAnImage = (ext) => {
  return [
    'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
    indexOf(ext.toLowerCase()) !== -1;
}

// 影像资料不同页面对应值（已弃用）
export const getImageData = (flag, data) => {
  let dataList = []
  switch (flag) {
    case '1': //申请信息
      dataList.push({
        imagetype: '申请书',
        imgList: data.imgList
      }, {
        imagetype: '征信授权书及征信报告',
        imgList: data.imgList
      }, {
        imagetype: '数据查询授权书',
        imgList: data.imgList
      })
      break;

    case '2': //个人客户信息
      dataList.push({
        imagetype: '营业执照',
        imgList: data.imgList
      }, {
        imagetype: '人脸识别照片',
        imgList: data.imgList
      }, {
        imagetype: '申请人身份证',
        imgList: data.imgList
      })
      break;

    case '3': //采购信息(未使用)
      dataList.push({
        imagetype: '项目中标通知书',
        imgList: data.imgList
      }, {
        imagetype: '中标合同原件',
        imgList: data.imgList
      }, {
        imagetype: '发票',
        imgList: data.imgList
      }, {
        imagetype: '验收材料',
        imgList: data.imgList
      })
      break;

    case '4': //尽调信息
      dataList.push({
        imagetype: '身份证正反面',
        imgList: data.imgList
      }, {
        imagetype: '营业执照',
        imgList: data.imgList
      }, {
        imagetype: '人脸识别',
        imgList: data.imgList
      }, {
        imagetype: '数据查询授权书',
        imgList: data.imgList
      }, {
        imagetype: '征信授权书以及征信报告',
        imgList: data.imgList
      }, {
        imagetype: '客户经理尽调报告',
        imgList: data.imgList
      }, {
        imagetype: '现场调查图片',
        imgList: data.imgList
      }, {
        imagetype: '其他',
        imgList: data.imgList
      })
      break;
    case '5': //客户查询-客户信息
      dataList.push({
        imagetype: '身份证正反面',
        imgList: data.imgList
      }, {
        imagetype: '征信报告',
        imgList: data.imgList
      })
      break;
    default:
      break;
  }
  console.log("图片列表" + JSON.stringify(dataList));

  return dataList
}

//筛选出影像资料中类型为其他的在上传影像页展示（已弃用）
export const getOtherImgList = (datas) => {
  let list = datas;
  let tempList = []
  list.forEach((element) => {
    // console.log("element=" + JSON.stringify(element));
    if (element.fileKind == "x") {
      let filePath = element.filePath
      let ext = filePath.substr(filePath.lastIndexOf(".") + 1);//获取后缀
      let temp = filePath.substr(filePath.lastIndexOf(':') + 1)
      let pathUrl = temp.substr(temp.indexOf('/') + 1); //
      // let pathUrl = filePath.substr(filePath.lastIndexOf('/') + 1); //去掉http://188.185.8.32:10040/
      if (isAssetTypeAnImage(ext) == true) {//图片
        tempList.push(
          {
            imageUrl: baseImgUrl + pathUrl,//图片地址
            isImg: true
          })
      } else {
        tempList.push(
          {
            imageUrl: require("@/assets/img/file.png"),
            resourceId: element.resourceId,
            resourceName: element.name,
            fileUrl: pathUrl,
            fileType: ext,
            resourceType: 'YX',
            isImg: false
          })
      }
    }

  });
  return tempList
}
// 筛选出影像资料中的合同附件/影像在上传页展示
export const dealContactList = (datas,keyList) => {
  let arr = [];
  let list = datas;
  let tempList = []
  list.forEach((element) => {
    let filePath = element.filePath
    let ext = filePath.substr(filePath.lastIndexOf(".") + 1);//获取后缀
    let temp = filePath.substr(filePath.lastIndexOf(':') + 1)
    let pathUrl = temp.substr(temp.indexOf('/') + 1); //
    // let pathUrl = filePath.substr(filePath.lastIndexOf('/') + 1); //去掉http://188.185.8.32:10040/
    if (isAssetTypeAnImage(ext) == true) {//图片
      tempList.push(
        {
          imageKind: element.fileKind,
          imageUrl: baseImgUrl + pathUrl,//图片地址
          isImg: true,//是否图片标志，用于区分文件预览和图片预览
          readonly: true,//是否只读标志
        })
    } else {
      tempList.push(
        {
          imageKind: element.fileKind,
          imageUrl: require("@/assets/img/file.png"),
          resourceName: element.name,
          fileUrl: pathUrl,
          fileType: ext,
          resourceType: 'YX',
          isImg: false,//是否图片标志，用于区分文件预览和图片预览
          readonly: true,//是否只读标志
        })
    }
  });
  keyList.forEach((item) => {
    var arrays = [];
    tempList.forEach((element) => {
      if (element.imageKind == item.itemKey) {
        arrays.push(element);
      }
    });
    arr.push({
      imageKind: item.itemKey,//类型
      imageKindName: item.itemName,//类型名
      imgList: arrays,//类型下的文件列表
      isAdd:true,//是否可添加
    });
  })

  return arr
}