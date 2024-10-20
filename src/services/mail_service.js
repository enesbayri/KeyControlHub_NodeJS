

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const sendMailVerification = async (email,tokenUrl) => {
    let transporter=nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        from: 'EBAYSOFT <info@ebaysoft.com>',
        to: email,
        subject:'TOKENINIZLA MAİLİNİZİ AKTİFLEŞTİRİN!',
        text:"EBAYSOFT olarak verilerimize ulaşmak isteyenleri kimliklendirip, kimlerle veri paylaştığımızı bilmek istiyoruz.Bu nedenle üyeliklerde kişisel tokenlarınızla mail adresinizi onaylamanız gerekmektedir. Mailinizi onaylamak için :  "+tokenUrl,
    },(err,info)=>{
        if(err){
            console.log(err);
            console.log('mail gönterilemedi!');
        }else{
            console.log('mail gonderildi!');
        }
        transporter.close();
    });
}


module.exports = sendMailVerification;