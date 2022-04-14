function main(lat,lon){
    /*
    Entrada: lat, lon
    Saída:  Indice de Nomenclatura (INOM) utilizado pelo 
            Sistema Cartográfico Nacional (SCN) Brasileiro
    */
    function range(ini,fim){
        return Array.from({length: fim}, (x, i) => i+ini);
    }
    function str(num){
        return num.toString();
    }
    function max(a,b){
        return Math.max(a,b);
    }
    function min(a,b){
        return Math.min(a,b);
    }
    function intersection(arr1,arr2){
        var set1 = new Set(arr1);
        var set2 = new Set(arr2);
        var inter = new Set(
            [...set1].filter(el => set2.has(el))
        );
        return [...inter];
    }
    //lat, lon = 5.3283,-60.1725 //NB-20-Z-B-VI-2-SO
    //lat, lon = 5.1917,-60.1929 //NB-20-Z-B-VI-4-NO 
    //lat, lon = -5.001,-70.001//SB-19-V-D-I-2-NE
    //lat, lon = -4.998,-70.003//SB-19-V-B-IV-4-SE 
    //lat, lon = -4.998,-69.998//SB-19-V-B-V-3-SO
    [lat, lon] =[ -5.001, -69.998]; //SB-19-V-D-II-1-NO
    //lat, lon = -5,-70//////////////// ?????? = SB-19-V-D-I-2-NE  ????????
    var hemisferio = lat > 0 ? 'N' : 'S' ;
    
    var fuso = '';
    var alfa = '';
    var vy_xz = '';
    var vx_yx = '';
    var vxyz = '';
    var ab_cd = '';
    var ac_bd = '';
    var abcd = '';
    var iiv_iiv_iiivi = '';
    var iiiiii_ivvvi = '';
    var iiiiiiivvvi = '';
    var umtres_doisquatro = '';
    var umdois_tresquatro = '';
    var umdoistresquatro = '';
    var none_sose = '';
    var noso_nese = '';
    var nonesose = '';
    //fuso: (Lim esq, Lim dir),
    var fusos={
        '18': (-78,-72)
    };
    var f0_esq = -180;
    var dx=6;
    for (var i=1;i<27;i++){
        fusos[str(i)]=(f0_esq,f0_esq+dx);
        if (f0_esq<lon && lon<=f0_esq+dx){
            fuso = str(i)
            dx=3;
            if (f0_esq<lon && lon<=f0_esq+dx){
                vy_xz = 'VY';
            }
            else{
                vy_xz = 'XZ';
                f0_esq+=dx;
            }
            dx=1.5;
            if (f0_esq<lon && lon<=f0_esq+dx){
                ac_bd = 'AC';
            }
            else{
                ac_bd = 'BD';
                f0_esq+=dx;
            }
            dx=0.5;
            if (f0_esq<lon && lon<=f0_esq+dx){
                iiv_iiv_iiivi = 'I_IV';
            }
            else if (f0_esq+dx<lon && lon<=f0_esq+dx+dx){
                iiv_iiv_iiivi = 'II_V';
                f0_esq+=dx;
            }
            else{
                iiv_iiv_iiivi = 'III_VI';
                f0_esq=f0_esq+dx+dx;
            }
            dx=0.25;
            if (f0_esq<lon && lon<=f0_esq+dx){
                umtres_doisquatro = '13';
            }
            else{
                umtres_doisquatro = '24';
                f0_esq+=dx;
            }
            dx=0.125;
            if (f0_esq<lon && lon<=f0_esq+dx){
                noso_nese = 'NO_SO';
            }
            else{
                noso_nese = 'NE_SE';
                f0_esq+=dx;
            }
            break;
        }
        f0_esq+=dx;
    }
    //fuso_lat: (Lim inf, Lim sup),
    var fusos_lat = {
        'A':(0,4)
    };
    var e0 = 0;
    if (hemisferio=='S'){
        var sinal = -1;
    } else{
        var sinal = 1;
    }
    var dy=4;
    let letras = "ABCDEFGHIFKLMNOPQRSTUV";
    for (var c=0; c<letras.length;c++){
        fusos_lat[c]=(e0,e0+sinal*dy);
        if (min(e0, e0+sinal*dy)<lat && lat<=max(e0, e0+sinal*dy)){
            alfa = letras.charAt(c);
            dy=2;
            if (min(e0, e0+sinal*dy)<lat && lat<=max(e0, e0+sinal*dy)){
                vx_yx = sinal<0  ? 'VX' : 'YZ';
            }
            else{
                vx_yx = sinal<0  ? 'YZ' : 'VX';
                e0 = e0 + sinal*dy;
            }
            dy=1;
            if (min(e0, e0+sinal*dy)<lat && lat<=max(e0, e0+sinal*dy)){
                ab_cd = sinal<0  ? 'AB' : 'CD';
            }
            else{
                ab_cd = sinal<0  ? 'CD' : 'AB';
                e0 = e0 + sinal*dy;
            }
            dy=0.5;
            if (min(e0, e0+sinal*dy) < lat && lat<= max(e0, e0+sinal*dy)){
                iiiiii_ivvvi = sinal<0  ? 'I_II_III' :'IV_V_VI';
            }
            else{
                iiiiii_ivvvi = sinal<0  ? 'IV_V_VI' :'I_II_III';
                e0 = e0 + sinal*dy;
            }
            dy=0.25
            if (min(e0, e0+sinal*dy) < lat && lat<=max(e0, e0+sinal*dy)){
                umdois_tresquatro = sinal<0  ? '12' : '34';
            }
            else{
                umdois_tresquatro = sinal<0  ? '34' : '12';
                e0 = e0 + sinal*dy;
            }
            dy=0.125;
            if (min(e0, e0+sinal*dy) < lat && lat<=max(e0, e0+sinal*dy)){
                none_sose = sinal<0  ? 'NO_NE' :'SO_SE';
            }
            else{
                none_sose = sinal<0  ? 'SO_SE' : 'NO_NE';
                e0 = e0 + sinal*dy;
            }
            break;
        }
        e0 = e0 + sinal*dy;
    }
    var inom1m = hemisferio+alfa+"-"+fuso;
    var vxyz = intersection(vy_xz,vx_yx).join('');
    var inom500k = inom1m+"-"+vxyz;
    var abcd = intersection(ac_bd,ab_cd).join('');
    var inom250k = inom500k+"-"+abcd;
    var iiiiiiivvvi = intersection(iiv_iiv_iiivi.split('_'),iiiiii_ivvvi.split('_')).join('');
    var inom100k = inom250k + "-"+ iiiiiiivvvi;
    var umdoistresquatro = intersection(umtres_doisquatro,umdois_tresquatro).join('');
    var inom50k = inom100k + "-"+ umdoistresquatro;
    var nonesose = intersection(noso_nese.split("_"),none_sose.split("_")).join('');
    var inom25k  = inom50k +"-"+ nonesose;
    console.log(hemisferio+alfa+"-"+fuso+"-"+vxyz+"-"+abcd+"-"+iiiiiiivvvi+"-"+umdoistresquatro+"-"+nonesose);
    return [inom25k,inom50k,inom100k,inom250k,inom500k,inom1m]
};
