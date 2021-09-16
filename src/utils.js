import _ from 'lodash'
import moment from 'moment';
import 'moment/locale/es'

export const utils = {
    fecha(f){
      return moment.parseZone(f).format("DD-MM-YYYY");
    },
    cuantohace(f){
      return moment.duration(moment(f).diff(moment()), "millisecond").locale("es").humanize(true);
    },
    currency(num){
        num = parseFloat(num);
        if (num !== "undefined" && num !== null) {
            return num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }else {
            return '-';
        }
    },
    porcentaje(num){
        num = parseFloat(num);
        if (num !== "undefined" && num !== null) {
            return num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }else {
            return '-';
        }
    },
    checkRol(idrol, roles = null){
        if (!roles || roles === undefined) {
            return false;
        }
        const rol = _.find(roles, ['id', idrol]);
        if (rol !== undefined) {
            return true;
        }
        return false;
    },
    pad_with_zeroes(number, length) {
        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }
        return my_string;
    },
    padRight(number,relleno, length) {
        var my_string = number;
        while (my_string.length < length) {
            my_string =  my_string + relleno;
        }
        return my_string;
    },
    base64ArrayBuffer(arrayBuffer) {
      var base64    = ''
      var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

      var bytes         = new Uint8Array(arrayBuffer)
      var byteLength    = bytes.byteLength
      var byteRemainder = byteLength % 3
      var mainLength    = byteLength - byteRemainder

      var a, b, c, d
      var chunk

      // Main loop deals with bytes in chunks of 3
      for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
      }

      // Deal with the remaining bytes and padding
      if (byteRemainder === 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3)   << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '==='
      } else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
      }

      return base64
    },
    openPDF(file){
      const win = window.open("","_blank");
      let html = '';
      html += '<html>';
      html += '<body style="margin:0!important">';
      html += '<embed width="100%" height="100%" src="data:application/pdf;base64,'+utils.base64ArrayBuffer(file)+'" type="application/pdf" />';
      html += '</body>';
      html += '</html>';
      setTimeout(() => {
        win.document.write(html);
      }, 5);
    },
    viewPDF(file){
      var fr = new FileReader();
      fr.readAsDataURL(file);
      var blob = new Blob([file], { type: "application/pdf" });
      var objectURL = window.URL.createObjectURL(blob);
      // var link = document.createElement('a');
      window.open(objectURL)
    },
    omitirAcentos(text) {
      var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
      var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
      for (var i=0; i<acentos.length; i++) {
          text = text.replace(new RegExp(acentos.charAt(i), 'g'), original.charAt(i));
      }
      return text;
  },
  primerLetra(text) {
    var acentos = "QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnm";
    var original = "QWERTYUIOPASDFGHJKLÑZXCVBNMQWERTYUIOPASDFGHJKLÑZXCVBNM";
    for (var i=0; i<acentos.length; i++) {
        text = text.replace(new RegExp(acentos.charAt(i), 'g'), original.charAt(i));
    }
    return text;
},

}
