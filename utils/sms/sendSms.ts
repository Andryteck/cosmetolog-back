import axios, {AxiosResponse} from 'axios'
const querystring = require('querystring')

// interface IParams {
//     phone: number
//     text: string
//     time: string
// }

interface ICreateSmsMessageResponse {
    status: string,
    parts: number,
    len: number,
    message_id: number,
    alphaname: string,
    time: number
}

interface ISendSmsResponse {
    sms_id: number,
    status: string
}

// type SendSms = {
// ????
//     sendSms: (number, text, time) => any;
// }

const instance = axios.create({
        baseURL: 'https://app.sms.by/api/v1/'
    }
)


async function sendSms({number, text, time}) {
    let params: any = {
        token: '0ffd27c599ea1a79784216c47e26ab5a',
        phone: number,
        message: text,
        time
    }

    const res = await instance.get<ICreateSmsMessageResponse>(`createSmsMessage?${querystring.stringify(params)}`)
    console.log(res.data)
    // @ts-ignore
    return instance.get<ISendSmsResponse>(`sendSMS?token=0ffd27c599ea1a79784216c47e26ab5a&message_id=${res.data.message_id}&phone=${params.phone}`)
}

module.exports = sendSms


