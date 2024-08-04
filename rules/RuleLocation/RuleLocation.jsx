import { useRef } from 'react';
import styles from "./RuleLocation.module.css";
import Rule from "../Rule";
import ReloadButton from '../../components/ReloadButton';


const locations = {
    'Afganistan': [34.5289, 69.1725],
    'Arnavutluk': [41.3275, 19.8189],
    'Cezayir': [36.7525, 3.042],
    'Arjantin': [-34.6051, -58.4004],
    'Ermenistan': [40.182, 44.5146],
    'Avustralya': [-35.2835, 149.1281],
    'Avusturya': [48.2064, 16.3707],
    'Azerbaycan': [40.3777, 49.892],
    'Bahamalar': [25.0582, -77.3431],
    'Bahreyn': [26.2154, 50.5832],
    'Bangladeş': [23.7104, 90.4074],
    'Barbados': [13.1, -59.6167],
    'Beyaz Rusya': [53.9, 27.5667],
    'Belçika': [50.8467, 4.3499],
    'Bermuda': [32.2915, -64.778],
    'Butan': [27.4661, 89.6419],
    'Brezilya': [-15.7797, -47.9297],
    'Bulgaristan': [42.6975, 23.3242],
    'Kamboçya': [11.5625, 104.916],
    'Kanada': [45.4166, -75.698],
    'Şili': [-33.4569, -70.6483],
    'Kolombiya': [4.6097, -74.0818],
    'Kongo': [-4.2658, 15.2832],
    'Hırvatistan': [45.8144, 15.978],
    'Küba': [23.1195, -82.3785],
    'Danimarka': [55.6759, 12.5655],
    'Mısır': [30.0392, 31.2394],
    'Fiji': [-18.1416, 178.4415],
    'Finlandiya': [60.1692, 24.9402],
    'Fransa': [48.8534, 2.3488],
    'Gürcistan': [41.6941, 44.8337],
    'Almanya': [52.5244, 13.4105],
    'Gana': [5.556, -0.1969],
    'Yunanistan': [37.9534, 23.749],
    'Grönland': [64.1835, -51.7216],
    'Gine': [9.5716, -13.6476],
    'Macaristan': [47.498, 19.0399],
    'İzlanda': [64.1355, -21.8954],
    'Hindistan': [28.6667, 77.2167],
    'Endonezya': [-6.2118, 106.8416],
    'Irak': [33.3406, 44.4009],
    'İrlanda': [53.3331, -6.2489],
    'İsrail': [31.769, 35.2163],
    'İtalya': [41.8947, 12.4811],
    'Jamaika': [17.997, -76.7936],
    'Japonya': [35.6895, 139.6917],
    'Ürdün': [31.9552, 35.945],
    'Kazakistan': [51.1801, 71.446],
    'Kenya': [-1.2833, 36.8167],
    'Kuveyt': [29.3697, 47.9783],
    'Liberya': [6.3005, -10.7969],
    'Litvanya': [54.6892, 25.2798],
    'Madagaskar': [-18.9137, 47.5361],
    'Malezya': [3.1412, 101.6865],
    'Maldivler': [4.1748, 73.5089],
    'Mali': [12.65, -8.0],
    'Mauritius': [-20.1619, 57.4989],
    'Meksika': [19.4273, -99.1419],
    'Monako': [43.7333, 7.4167],
    'Moğolistan': [47.9077, 106.8832],
    'Montserrat': [16.7918, -62.2106],
    'Fas': [34.0133, -6.8326],
    'Mozambik': [-25.9653, 32.5892],
    'Myanmar': [19.745, 96.1297],
    'Nepal': [27.7017, 85.3206],
    'Hollanda': [52.374, 4.8897],
    'Yeni Zelanda': [-41.2866, 174.7756],
    'Nijerya': [9.0574, 7.4898],
    'Norveç': [59.9127, 10.7461],
    'Umman': [23.6139, 58.5922],
    'Pakistan': [33.7035, 73.0594],
    'Panama': [8.9958, -79.5196],
    'Paraguay': [-25.3007, -57.6359],
    'Peru': [-12.0432, -77.0282],
    'Filipinler': [14.6042, 120.9822],
    'Polonya': [52.2298, 21.0118],
    'Portekiz': [38.7169, -9.1399],
    'Porto Riko': [18.4663, -66.1057],
    'Katar': [25.2747, 51.5245],
    'Romanya': [44.4328, 26.1043],
    'Samoa': [-13.8333, -171.7667],
    'Suudi Arabistan': [24.6905, 46.7096],
    'Sırbistan': [44.8176, 20.4633],
    'Singapur': [1.2897, 103.8501],
    'Slovakya': [48.1482, 17.1067],
    'Somali': [2.0416, 45.3435],
    'Güney Afrika': [-33.9258, 18.4232],
    'İspanya': [40.4165, -3.7026],
    'Sri Lanka': [6.9319, 79.8478],
    'Sudan': [15.5518, 32.5324],
    'İsveç': [59.3326, 18.0649],
    'İsviçre': [46.9481, 7.4474],
    'Tayland': [13.722, 100.5252],
    'Tunus': [36.819, 10.1658],
    'Türkiye': [39.9199, 32.8543],
    'Türkmenistan': [37.95, 58.3833],
    'Uganda': [0.3163, 32.5822],
    'Ukrayna': [50.4454, 30.5186],
    'Birleşik Krallık': [51.5085, -0.1257],
    'Uruguay': [-34.8335, -56.1674],
    'Özbekistan': [41.2647, 69.2163],
    'Yemen': [15.3531, 44.2078],
    'Zambiya': [-15.4134, 28.2771],
    'Zimbabve': [-17.8294, 31.0539]
};


export default class RuleLocation extends Rule{
    constructor(){
        super("Şifreniz bu enlem ve boylamdaki ülkenin adını içermelidir.");
        this.keys = Object.keys(locations);
        this.locationName = this.keys[Math.floor(Math.random()*this.keys.length)];
        console.log("Country:", this.locationName);

        this.renderItem = ({regenerateRule, correct}) => <Location locationName={this.locationName} regenerate={()=>regenerateRule(this.num)} correct={correct}/>
    }

    regenerate(){
        this.locationName = this.keys[Math.floor(Math.random()*this.keys.length)];
        console.log("Country:", this.locationName);
    }

    check = (txt) => {
        let r = RegExp(`(?:${this.locationName})`, "i");
        return r.test(txt);
    }
}


function Location({locationName, regenerate, correct}){
    const latitude = locations[locationName][0];
    const longitude = locations[locationName][1];
    const reloadsLeft = useRef(3);    

    return (
        <div className={styles.location_wrapper}>
            <div className={styles.location}>
                {latitude}, {longitude}
            </div>
            <ReloadButton 
                onClick={()=>{
                    if(reloadsLeft.current>0){
                        regenerate()
                        reloadsLeft.current--; 
                    }
                }} 
                hidden={correct} 
                reloadsLeft={reloadsLeft.current}
            />
        </div>
    )
}