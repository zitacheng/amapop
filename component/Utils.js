import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const Parse = require('parse/react-native.js');
import {Alert} from 'react-native';
// import {translate} from '../constant/config.js';
import {color} from '../constant/color.js';
// import SpInAppUpdates, {
//   NeedsUpdateResponse,
//   IAUUpdateKind,
//   StartUpdateOptions,
// } from 'sp-react-native-in-app-updates';
import DeviceInfo from 'react-native-device-info';
import {getVersion, getBuildNumber} from 'react-native-device-info';
import compareVersions from 'compare-versions';
import logo from '../assets/logo.png';

// const inAppUpdates = new SpInAppUpdates(false);

export function registerInstal(user) {
  var installationController = Parse.CoreManager.getInstallationController();
  installationController
    .currentInstallationId()
    .then(async function (iid) {
      var token = await AsyncStorage.getItem('token');
      var installation = new Parse.Installation({
        installationId: iid,
        deviceToken: token,
        deviceType: Platform.OS,
        user: user.id,
        pushType: Platform.OS === 'ios' ? 'APN' : 'GCM',
        appIdentifier: Platform.OS === 'ios' ? 'com.jennkim' : 'com.jennkim',
      });
      return installation.save();
    })
    .then(function (installation) {})
    .catch((err) => {});
}

export function saveLang(user) {
  // let changed = false;
  user.set('openDate', new Date());
  if (!user.get('platform') || user.get('platform') != Platform.OS) {
    user.set('platform', Platform.OS);
    // changed = true;
  }
  if (
    !user.get('version') ||
    user.get('version') != getBuildNumber() ||
    user.get('version') != getVersion()
  ) {
    user.set('version', Platform.OS == 'ios' ? getVersion() : getBuildNumber());
  }
  // if (user && user.get('lang') != i18n.locale) {
  //   user.set('lang', i18n.locale);
  // }

  user.save(null, {useMasterKey: true}).then(
    (res) => {},
    (err) => {},
  );
}

export function saveItem(like, item, setLoading, favs, user, idx, setFavs) {
  setLoading(true);
  if (like) {
    const Favorite = Parse.Object.extend('Favorite');
    const req = new Favorite();

    req.set('client', user);
    req.set('product', item);
    req.save().then(
      (fav) => {
        item.fav = true;
        setLoading(false);
      },
      (error) => {
        // Alert.alert(translate('fav_err'), translate('try_later'), [
        //   {text: translate('ok'), onPress: () => setLoading(false)},
        // ]);
      },
    );
  } else {
    var req = favs.filter((el) => el.get('product').id === item.id);
    if (req.length > 0) {
      req[0].destroy().then(
        (fav) => {
          item.fav = false;
          if (idx != null) {
            favs.splice(idx, 1);
          }
          setLoading(false);
        },
        (error) => {
          // Alert.alert(translate('del_fav_err'), translate('try_later'), [
          //   {text: translate('ok'), onPress: () => setLoading(false)},
          // ]);
        },
      );
    } else {
      setLoading(false);
    }
  }
}

export function stateColor(val) {
  switch (val) {
    case -1:
      return 'black';
    case -2:
      return 'black';
    case 1:
      return 'black';
    case 2:
      return color.pink;
    case 3:
      return 'black';
    case 4:
      return color.green;
    default:
      return 'black';
  }
}

export function defaultPic(item) {
  if (item.get('main') != true && item.get('img')) {
    return {uri: item.get('img')._url};
  } else if (
    item.get('main') != true &&
    item.get('parent').get(item.get('defaultImg'))
  ) {
    return {uri: item.get('parent').get(item.get('defaultImg'))._url};
  } else if (item.get('main') == true && item.get('img')) {
    return {uri: item.get('img')._url};
  } else {
    return logo;
  }
}


// export async function updateAppVersion() {
//   const Attribute = Parse.Object.extend('Attribute');
//   const query = new Parse.Query(Attribute);
//   query.equalTo('type', 'system');
//   query.equalTo('value', 'update');
//   let res = await query.find({useMasterKey: true});
//   if (
//     res[0].get('activate') == true &&
//     ((Platform.OS == 'android' && getBuildNumber() < res[0].get('android')) ||
//       (Platform.OS == 'ios' &&
//         compareVersions(getVersion(), res[0].get('ios')) == -1))
//   ) {
//     let updateOptions = {};
//     if (Platform.OS === 'android') {
//       updateOptions = {
//         updateType: IAUUpdateKind.IMMEDIATE,
//       };
//     }
//     if (Platform.OS === 'ios') {
//       updateOptions = {
//         forceUpgrade: true,
//       };
//     }
//     inAppUpdates.startUpdate(updateOptions);
  
//   }
// }


  // inAppUpdates.checkNeedsUpdate().then((result) => {
    //   console.log(result);
    //   if (result.shouldUpdate) {
    //     inAppUpdates.startUpdate(updateOptions);
    //   }
    // });