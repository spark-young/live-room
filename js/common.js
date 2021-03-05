var CommonObj = {
    getUrlSearch: function (name) {
        // 未传参，返回空
        if (!name) return null;
        // 查询参数：先通过search取值，如果取不到就通过hash来取
        let after = window.location.search;
        after = after.substr(1) || window.location.hash.split('?')[1];
        // 地址栏URL没有查询参数，返回空
        if (!after) return null;
        // 如果查询参数中没有"name"，返回空
        if (after.indexOf(name) === -1) return null;

        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        // 当地址栏参数存在中文时，需要解码，不然会乱码
        const r = decodeURI(after).match(reg);
        // 如果url中"name"没有值，返回空
        if (!r) return null;

        return r[2];

    }, ICEServer: {
        iceServers: [
            {url: "stun:stun.l.google.com:19302"}, // 谷歌的公共服务
            {
                "urls": ["turn:121.5.12.89:3478"],
                "username": "user",
                "credential": "123456"
            }
        ],
        sdpSemantics: 'plan-b'

    }, mediaConstraints: {
        optional: [],
        mandatory: {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: true
        }
    }
    , constraints: {
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
        },
        video: {
            width: {min: 1024, ideal: 1280, max: 1920},
            height: {min: 776, ideal: 720, max: 1080}
        }
    }

};

