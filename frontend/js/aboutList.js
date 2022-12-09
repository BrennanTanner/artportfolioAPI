import { getIdFromUrl } from "./utils";

export default class AboutList {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async init() {
        const id  = getIdFromUrl();
        const list = await this.dataSource.getOwnersData(id);

        const template = document.querySelector('.aboutCollection');
        console.log(template);
        template.append(this.artPieceTemplate(list))
        
    }

    artPieceTemplate(element) {
        let aboutSection = document.createElement('div');
        let aboutProfile = document.createElement('img');
        let callIcon = document.createElement('img');
        let mailIcon = document.createElement('img');
        let aboutInfo = document.createElement('p');
        let contactInfo = document.createElement('div');
        let textInfo = document.createElement('div');
        let call = document.createElement('div');
        let mail = document.createElement('div');
        let email = document.createElement('p');
        let phone = document.createElement('p');

        aboutSection.className = "aboutSection";
        textInfo.className = "textInfo";
        contactInfo.className = "contactInfo";

        aboutProfile.src = element.profileImg;
        aboutInfo.textContent = element.aboutMe;
        email.textContent = element.email;
        phone.textContent = element.phoneNumber;
        callIcon.setAttribute("src", "/public/call.svg");
        mailIcon.setAttribute("src", "/public/mail.svg");

        aboutSection.appendChild(aboutProfile);
        aboutSection.appendChild(textInfo);
        textInfo.appendChild(aboutInfo);
        textInfo.appendChild(contactInfo);
        contactInfo.appendChild(mail);
        contactInfo.appendChild(call);
        mail.appendChild(mailIcon);
        mail.appendChild(email);
        call.appendChild(callIcon);
        call.appendChild(phone);
        
        return aboutSection;
    }

}