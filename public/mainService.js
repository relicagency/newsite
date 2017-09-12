/**
 * Created by Seth on 8/11/2017.
 */
(function() {
    angular.module('app').service('mainService', function ($http) {

        let nav = document.getElementById('nav');

        this.navBackground = function(offset){


             if(offset > 100){
                  TweenMax.to(nav, 2, {
                      backgroundColor: "rgba(0,0,0,0.9)"
                  })
             } if(offset < 95){
                 TweenMax.to(nav, 2, { backgroundColor: "rgba(0,0,0,0)"} );
            }

        };

        this.parallaxIt = function(pic, picLax){
            TweenMax.to(pic, 0, {
                top: picLax + "px"
            })
        };

        this.contactRelic = function(contact){
            return $http ({
                method: 'POST',
                url: '/relic/contact',
                data : {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    jobTitle: contact.jobTitle,
                    business: contact.business,
                    email: contact.email,
                    phone: contact.phone,
                    message: contact.message,
                    captcha: contact.captcha
                }
            }).then(function(response){
                return response
            })
        };

        this.clients = {
            tds: {
                title: "TDS",
                intro: "Our team started working with a company called Baja Broadband in 2012. They even named us as one of the top 5 reasons for their success. We worked on media, creative and digital services and became so ingrained and knowledgable about their company that we were asked to stay on when TDS Telecom bought the company in 2014. Relic was an instrumental part of the TDS rebrand in 2015.",
                stats: "../../images/work-assets/tds-case.png",
                video: true,
                logoPath: "../../images/tds-logo.svg"
            },
            bryce: {
                title: "Garfield County Tourism",
                intro: "Garfield County Tourism hired us to help make their brand message consistent. We replaced a lot of print with digital creatives that they had never used before. In 2014, they challenged us to create a campaign to help visitors stay longer in Garfield County. In response, we launched the Take Your Time campaign. Through this effort, the TRT increased by 15.8 percent in 2015 from 2014 and by 8 percent in 2016 from 2015.",
                stats: "../../images/work-assets/GarfieldStat.png",
                video: false,
                logoPath: ""
            },
            tuac: {
                title: "Tuacahn",
                intro: "Tuacahn Amphitheatre hired us in 2013 for a small creative refresh. A couple months after that, they came back for a little more. We started doing their TV and radio buys later that year while acting as a consultant for other buys. The following year, in 2014, we took over their entire marketing budget. We now provide showstopping creative, digital, media and social media services for the popular venue.",
                stats: "../../images/work-assets/tuac-stats.png",
                video: false,
                logoPath: ""
            },
            uintah: {
                title: "Uintah County Tourism",
                intro: "Uintah County Tourism hired us in 2015 to help make their brand message consistent. In 2016, we determined the correct target audience and created a message that spoke to parents with young children. Thus the Origin of Adventure campaign was born, featuring the well-beloved dinosaurs, Vern and Al. Even after an economical crisis in Vernal, visitation numbers in Uintah County increased by 11.4 percent during May, their busiest month.",
                    stats: "../../images/work-assets/uintah-stat.png",
                video: false,
                logoPath: ""
            },
            uvhb:{
                title: "Utah Valley Home Builders",
                intro: "UVHBA hired us to help advertise their annual Parade of Homes in 2012. The Parade is their biggest revenue builder and attracted about 8,000 visitors. After a couple of years going strictly by the book, we convinced UVHBA to take a leap of faith in 2014 and truncate their budget into only 30 days. That year, ticket sales increased by 32 percent. In 2016, over 25,000 people came to the parade.",
                    stats: "../../images/work-assets/uvhb-stats.png",
                video: false,
                logoPath: ""
            },
            maxx: {
                title: "MaxxSouth",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""
            },
            moab: {
                title: "Moab",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            zerorez: {
                title: "Zerorez",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            wfront: {
                title: "WorkFront",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            us: {
                title: "Utah Shakespeare Festival",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            brio: {
                title: "Brio",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            ccbh: {
                title: "Brio",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            beehive: {
                title: "Beehive Broadband",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            rubys: {
                title: "Ruby's Inn",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            creef: {
                title: "Wayne County Tourism",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            b2scapes: {
                title: "B2 Landscapes",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            },
            branding: {
                title: "Branding",
                intro: "",
                stats: "",
                video: false,
                logoPath: ""

            }
        };

    });
})();