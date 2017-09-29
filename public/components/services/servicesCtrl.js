/**
 * Created by Seth on 8/11/2017.
 */
(function(){
    angular.module('app').controller('servicesCtrl', function($scope, $stateParams, $location, $anchorScroll, mainService){

        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };


        let lastAccordion = "";
        let lastTopSec = 0;
        let lastTopSecInd = "two";
        let backgroundPic = document.getElementById('services-background');
        $scope.content = $stateParams.num;

        $scope.changeContent = function(num, ind){

            $scope.content = num;

            if(lastTopSec !== num){
                TweenMax.to(document.getElementById('services-top-overlay-' + ind), 0.25, {
                    height: 0
                });
                TweenMax.to(document.getElementById('services-top-overlay-' + lastTopSecInd), 0.25, {
                    height: "100%"
                });
                TweenMax.to(document.getElementById('top-two-sec-' + ind), 0.25, {
                    backgroundColor: "white"
                });
                TweenMax.to(document.getElementById('top-two-sec-' + lastTopSecInd), 0.25, {
                    backgroundColor: "transparent"
                });
            }

           

            lastTopSec = num;
            lastTopSecInd = ind;
        };
        $scope.changeContent($stateParams.num, "one");

        window.onscroll = function() {
            let offSet = window.pageYOffset,
                csParaStart = offSet * 0.75;

            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic,csParaStart);
        };


        $scope.hoverContent = function(num){

        };

        $scope.accordionPop = function(num) {


                TweenMax.to(document.getElementById('accordion-pop-' + num), 0.5, {
                    ease: Power3.easeIn,
                    height: "auto"
                });
            TweenMax.to(document.getElementById('accordion-pop-' + num), 0.25, {
                color: "#161616"
            });
                TweenMax.to(document.getElementById('plus-sign-' + num), 0.5, {
                    transform: "rotate(315deg)"
                });


                if( lastAccordion !== "" && document.getElementById('accordion-pop-' + lastAccordion).style.height !== "0px" )  {

                    TweenMax.to(document.getElementById('accordion-pop-' + lastAccordion), 0.05, {
                        color: "transparent"
                    });
                    TweenMax.to(document.getElementById('accordion-pop-' + lastAccordion), 0.5, {
                        ease: Power3.easeOut,
                        height: 0
                    });
                    TweenMax.to(document.getElementById('plus-sign-' + lastAccordion), 0.5, {
                        transform: "rotate(0deg)"
                    });
                }


            lastAccordion = num;

        };

        $scope.content = 0;

        $scope.services = [

            {
                title: 'Traditional Media',
                intro: "There are certain things in life that are risky. Asking out that girl you’ve been eyeing across the room? Risky. Looking into a new investment? Risky. The movie Risky Business? Ironically, not that risky. However, traditional media and media buying should never have you on the edge of your seat. Relic has media buying experts who focus on negotiating and planning to guarantee the highest return for each client.",
                sections: [
                    {number: "one", title: "TV", info: ["We’ve noticed a myth going around. No, not that one about Steve in accounting and his weirdly large left foot – myth about TV spots. Some people are led to believe that TV advertisements have been completely supplanted by digital marketing, but that’s not the case. There is strength in a good TV spot, and Relic’s media team ensures that your TV ads are presented to the correct demographics to leave a lasting impact on your audience."]},
                    {number: "two", title: "Radio", info: ["Did you know that it’s scientifically proven that everybody listens to music? Everyone. You know that person you’re thinking of who may not listen to music? Nope, they do too. The fact that everyone loves music means radio spots bring tremendous advertising value. A radio ad is wonderful because it is exactly like a shotgun Vegas wedding – cost effective, time efficient, and it leaves a trail of measurable results."]},
                    {number: "three", title: "Print/Newspaper", info: ["Much like Apple products, print ads and newspapers have been permeating our lives for as long as we can remember, and these items are not leaving any time soon. There’s a good reason for it, too. Print advertising offers certain advantages that create tangible and distinct results. Printed ads in magazines target niche markets, while newspapers target regional audiences. Loyal readership provides a sense of trust that can be used to your advantage. Relic’s media team finds the perfect publications for your ads and delivers measurable results on them."]},
                    {number: "four", title: "Outdoor Advertising", info: ["Imagine the cool breeze running through your hair, the sounds of nature in your ears, the beautiful smell of exhaust—there’s nothing quite like the great outdoors. Turns out, it’s also a great place to advertise. Relic’s team has been working with unique, distinguishable outdoor advertising for years. We know exactly what it takes to ensure the best results for your campaign. From roadside billboards to public transit banners, Relic delivers the best placement for your ads to ensure you have the greatest reach, the best ROI and drive the most engagement with your products."]},
                    {number: "five", title: "Direct Mail", info: ["Direct mail offers the opportunity to personally connect with an audience in an original way that sets you apart from the competition. The key to building any relationship with a customer is communicating a clear message and making it personal. Studies found that once a direct mail piece is opened, the recipient is more likely to engage with the company. Relic’s team has seen remarkable success with our direct mail pieces. In fact, I’m currently recruiting Relic to send out direct mail pieces to potential dating partners. Stay tuned for an update. (Update: apparently I’m married and my wife was not happy with what turned up in our mail today. Though it did intrigue her enough to open it)."]},
                    {number: "six", title: "Sponsorships", info: ["Sponsorship advertising is a great way to build up a reputable brand image for your company. Sponsoring a local event will insert your brand name in the forefront of the minds of the public. Additionally, sponsorships can build priceless PR value. Being a part of these sponsored events will show the positive impact you have on your community. The hardest part of sponsorships is finding the best events to be a part of, and Relic’s team knows the exact information your audience will want to see. Always keep in mind the importance of relevance. There’s a reason you never see events such as the “Nike Hotdog Eating Contest.”"]}
                    ]
            },{
                title: 'Creative',
                intro: "Do you remember the last advertisement you saw? Creating a message that resonates can be difficult. Our creative team specializes in delivering unforgettable campaigns, content and designs. Good creative should communicate the same message as when you meet your in-laws for the first time−a strong, memorable directive that leaves just enough of an impact that you’ll linger in the back of their minds. It’s a tough balance, but we’ll work with you to ensure that we deliver creative that knocks your customers’ weirdly colorful socks off.",
                sections: [
                    {number: "one", title: "Creative Strategy", info: ["Any successful company, brand or campaign has a creative strategy behind it. Believe it or not, this is actually not decided by blindly throwing darts in the Museum of Modern Art and seeing what we hit. It consists of detailed market research, a strategic plan and an effective delivery. The creative team at Relic provides top-of-the-line design from our best and brightest minds, ensuring that your campaign delivers the best results."]},
                    {number: "two", title: "Campaign Development", info: ["From conception to execution, the creative development of a campaign will shape the future of your company. At Relic, we believe that collaboration and attentiveness are the tenets to any successful campaign. While we work with you to develop the correct strategy, we will combine your vision with our renowned creative expertise. As all the pieces of our jigsaw puzzle of ideas come together, that’s when you’ll see the sparks fly. In a good way. Nothing is on fire, don’t worry."]},
                    {number: "three", title: "Branding", info: ["Every brand has a story to tell. The creative techniques behind branding will reflect the message you convey to the public. Why do certain brands stick with you? Why are you loyal to certain brands but not others? The answer is simple. In today’s content-driven society, a compellingly crafted story will do more for your bottom line than ads. But if you’ve ever been in a job interview, you know that sometimes it’s hard to recognize what sets you apart. Let Relic highlight your company’s unique qualities. You have a story worth telling; let us share it."]},
                    {number: "four", title: "Graphic Design", info: ["Graphic design is the backbone for any creative work. But like your parents taught you, “Actions speak louder than words,” and we at Relic think that our graphics speak fairly loud. Check out our design portfolio from our client work. (LINK TO WORK PAGES)"]},
                    {number: "five", title: "TV/Radio Production", info: ["When the radio was invented in 1895, Guglielmo Marconi was quoted saying that he couldn’t wait for Relic to take full advantage of his invention (don’t fact check us on that). The flattery paid off, and now Relic is producing many TV and radio spots every year. Specifically targeted TV and radio ads are still tremendously valuable today, and Relic has the production process down."]},
                    {number: "six", title: "Web Design/Development", info: ["Relic also offers website design and development services. From complete web overhaul to slight, but important, adjustments, our web team will prove to be invaluable. We’ll take your website from the lame Neville Longbottom in the first Harry Potter to the snake-slaying hero from the last movie.]"]}
                    ]
                },
            {
                title: 'Demand Generation',
                intro: "B2B demand generation is not a new concept, but it’s one that can be approached in new ways. Ultimately, demand gen is the process of collecting leads on new business, and there are countless ways to approach this. With big data, in-depth analytics tools and more resources at your fingertips, demand gen has never had a more direct correlation to your company’s bottom line than it does today. However, you can only contribute to that revenue stream once you have properly structured your marketing efforts around demand gen.",
                sections: [
                    {number: "one", title: "Content Syndication", info: ["Ready to take your demand gen to the next level? More often than not, the main barrier holding you back is your content syndication – the process of pushing your high quality content to third-parties, allowing you to be viewed by a much broader audience. So why not syndicate your own content? Well, like killing your own turkey for Thanksgiving dinner, poor execution can lead to disastrous results. One of the best ways to keep a steady stream of new prospects joining your funnel is to syndicate your high performing content to established and engaged audiences, and Relic’s team will ensure that everything is done to perfection."]},
                    {number: "two", title: "Marketing Automation", info: ["You may think that all those emails you get from businesses are spam, but you’re getting them for a reason. They’re effective! Proper marketing automation planning and execution will not only generate leads for your business, it can push leads all the way through your conversion funnel. Marketing automation is also the perfect way to build brand awareness. The more you’re on your audience’s mind, the more likely they are to purchase."]},
                    {number: "three", title: "Social Media Advertisements", info: ["Did you know that the average person spends over five years on of their life on social media? With so much time being spent pretending to care about your friends from high school, social media presents a huge marketing opportunity. Relic’s team targets the correct audiences at the correct time to get your ad in front of the correct people on all social media platforms. With both paid and lead generation ads, your top-of-funnel marketing efforts will be filled with qualified opportunities. Think of social media ads as a teenage girl. Does anyone care that Stephanie doesn’t have a homecoming date? Of course not, but get the post in front of the perfect audience at the appropriate time, and she just might generate some leads."]},
                    {number: "five", title: "Account Based Marketing", info: ["Consider how weird B2B marketing truly is. You are trying to create a plan to bring in many businesses, each with their own strengths, weaknesses and challenges, by using a singular plan. While this overarching method can be extraordinarily successful, some businesses may not see this as the best tactic. Account based marketing presents your business in a personal setting to allow for a more intimate connection with your brand. One-on-one communication fosters lasting relationships that create extended business opportunities for your company. Relic’s demand gen team can help to create this personal connection and deliver lasting customer relationships."]},
                    {number: "six", title: "Retargeting", info: ["Contrary to popular belief, retargeting is not visiting Target twice in one day, as fun as that sounds. Retargeting is actually a highly effective demand gen tactic that tracks visitors to your site. As users are browsing the web, your retargeting ads will be shown to them, turning window shoppers into buyers. Don’t know where to get started? That’s what Relic is here for."]},
                    {number: "seven", title: "PPC", info: ["What better place to advertise than where customers are actively searching for your product? Our experienced, paid search campaign managers will select relevant keywords to ensure your business appears at the top of Google’s and other search engines’ results when those keywords are entered. Our campaigns are optimized monthly to eliminate waste. And no, we’re not talking about firing Toby in HR. He’s actually super helpful."]},
                    {number: "eight", title: "Direct Mail", info: ["Direct mail offers the opportunity to personally connect with an audience in an original way that sets you apart from the competition. The key to building any relationship with a customer is communicating a clear message and making it personal. Studies found that once a direct mail piece is opened, the recipient is more likely to engage with the company. Relic’s team has seen remarkable success with our direct mail pieces. In fact, I’m currently recruiting Relic to send out direct mail pieces to potential dating partners. Stay tuned for an update. (Update: apparently I’m married and my wife was not happy with what turned up in our mail today. Though it did intrigue her enough to open it)."]},
                    {number: "eleven", title: "SEO", info: ["Google is the most trusted resource on the internet. That’s why it’s responsible for almost 3/4 of all web searches. If your website doesn’t match Google’s search results, your competitor could overtake your position and poach your potential sales. Our SEO team is well versed in Google’s latest algorithms and ready to make sure your site stays at the top of Google and other search engines’ organic results.]"]}
                    ]
            },
            {
                title: 'Digital',
                intro: "Marketing has always been about connecting with your audience in the right place at the right time. With people spending more time online, it has become apparent that often the best place to advertise is online. Relic’s digital team is experts in every aspect of online marketing, from SEO to website optimization to in-depth analytics. Read about our best digital offerings below, then contact us when you realize that we are the heaven-sent digital marketing agency that you have been waiting for.",
                sections: [
                    {number: "one", title: "PPC", info: ["What better place to advertise than where customers are actively searching for your product? Our experienced, paid search campaign managers will select relevant keywords to ensure your business appears at the top of Google’s and other search engines’ results when those keywords are entered. Our campaigns are optimized monthly to eliminate waste. And no, we’re not talking about firing Toby in HR. He’s actually super helpful."]},
                    {number: "two", title: "SEO", info: ["Google is the most trusted resource on the internet. That’s why it’s responsible for almost 3/4 of all web searches. If your website doesn’t match Google’s search results, your competitor could overtake your position and poach your potential sales. Our SEO team is well versed in Google’s latest algorithms and ready to make sure your site stays at the top of Google and other search engines’ organic results."]},
                    {number: "three", title: "Social Media Advertisements", info: ["Did you know that the average person spends over five years on of their life on social media? With so much time being spent pretending to care about your friends from high school, social media presents a huge marketing opportunity. Relic’s team targets the correct audiences at the correct time to get your ad in front of the correct people on all social media platforms. With both paid and lead generation ads, your top-of-funnel marketing efforts will be filled with qualified opportunities. Think of social media ads as a teenage girl. Does anyone care that Stephanie doesn’t have a homecoming date? Of course not, but get the post in front of the perfect audience at the appropriate time, and she just might generate some leads."]},
                    {number: "four", title: "Facebook Instant Articles", info: ["Instant Articles are a new way to interact with your consumers on Facebook. Loading 10 times faster than normal links, Instant Articles are 20 percent more likely to be read and 70 percent less likely to be abandoned, making adorable puppies the only other thing less likely to abandoned. Relic’s digital team is always on top of new online marketing opportunities, and Instant Articles is one of the latest digital techniques we have seen success with."]},
                    {number: "five", title: "Display Advertisements", info: ["With the amount of time spent online, web advertising is vital for any business, so let us help you out. Relic uses display ads to effectively communicate your message through graphic design images, rich media, video, audio, flash and more. With our display ads, you’ll get noticed more than Liam Neeson’s fictional children get kidnapped."]},
                    {number: "six", title: "Marketing Automation", info: ["You may think that all those emails you get from businesses are spam, but you’re getting them for a reason. They’re effective! Proper marketing automation planning and execution will not only generate leads for your business, it can push leads all the way through your conversion funnel. Marketing automation is also the perfect way to build brand awareness. The more you’re on your audience’s mind, the more likely they are to purchase."]},
                    {number: "seven", title: "Website Optimization", info: ["Just because you desire a change on your website doesn’t mean you should do it. Our website optimization team will A/B test changes on your website to make sure the site is converting at the highest rate possible. This testing ensures that all images, buttons, copy and other web functions operate properly on all devices. Let data drive the decision making on your website so that you have time to focus on more important things, like how Arie became the next bachelor over Peter when clearly Peter deserved it. Just look at that face."]},
                    {number: "eight", title: "Reporting & Analytics", info: ["Spend your money where it counts. If you’re going to try the shotgun approach and just throw money at something and hope it works, we would prefer if you throw that money at us. We investigate your target markets and get to know what they like and what they are talking about in order to create an efficient campaign. Our professionals research which ads and posts work the best for your audience through our extensive reporting and analytics.]"]}
                    ]
            },
            {
                title: 'PR & Content',
                intro: "While certain reality TV stars may have lead you to believe that any press is good press, we vehemently disagree. Public relations exists for the exact opposite reason; we ensure that you and your company are represented in the best possible light. PR is necessary because it will boost credibility in ways advertising simply cannot. Relic’s team specializes in media pitches, press releases, social media, website content and more in order to increase the public awareness of our clients and their unique work and offerings. For more information on Relic’s PR resources, click on any of the tabs below. For less information, click here.",
                sections: [
                    {
                        number: "one",
                        title: "Media Relations",
                        info: ["Our PR team has established trusted relationships with members of the media, resulting in maximum reach. Need a press release to be distributed? We know the perfect outlets to contact to reach your target audience. Need to monitor the media and reactions to recent events? Our team is on top of it. Need to convince the media that you own three fire-breathing dragons who are coming to take over the continental United States? Honestly, we probably can’t help you with that, but contact us immediately. We want in."]
                    },
                    {
                        number: "two",
                        title: "Brand Management",
                        info: ["Dealing with backlash from the dragon fiasco? Don’t worry, Relic’s PR team has you covered. Brand management is right up our wheelhouse. Our team has experience assisting clients in communicating clearly and effectively with the media in order to get the correct message to the correct people and minimize potential damage. Check our work with Garfield County during its fire crisis to learn more. (LINK HERE)", "Additionally, Relic’s PR team will be the best hype-man you’ve ever had. In today’s world, having a strong, recognizable brand will go a long way in driving business. Our team will ensure that everything associated with your company’s name involves sunshine, rainbows and Single Ladies by Beyoncé"]
                    },
                    {
                        number: "three",
                        title: "Event Planning and Management",
                        info: ["One of the best ways to build PR value is by giving people bags of cash. Unfortunately, we’re not cartoon villains, so we found an even better alternative: events. Big or small, events will build valuable relationships with the public, and the best part is that Relic’s team will handle everything. As we work with you to schedule the perfect venues, book the best entertainment and order the most delicious food, you’ll see the power and influence that a successful event can bring."]
                    },
                    {
                        number: "four",
                        title: "Social Media Management",
                        info: ["Good news, social media provides a platform that makes it simple to reach your target audience and deliver any message at any time.", "Bad news, the people browsing social media typically have the attention span of a fly with ADHD, and whatever you’re publishing isn’t nearly as interesting as their cat videos or dancing hotdog memes.", "If you want to reach your target market, you’re going to need to provide content that is relevant and specific to them. That just so happens to be Relic’s expertise. Our content team does extensive research to identify the correct audiences to target, then creates and delivers the necessary content to give your company its greatest reach. We monitor the impact of our social media posts through analytics tools and make any adjustments needed going forward. We’re always looking for new, innovative ways to reach your target audiences."]
                    },
                    {
                        number: "five",
                        title: "Content Marketing",
                        info: ["Words are powerful! You can write to your heart’s content, but without proper strategy and execution, you’ll be writing to no avail. With good writers and a detailed content plan, content marketing pieces can provide incredible value. With website copy, blog posts, newsletters and everything in between, a specific content plan and goal is essential to provide both purpose and substance. Relic’s content team has experience writing everything from short blog posts to long-form white papers, and we’re waiting for you to tap into our expertise."]
                    },
                    {
                        number: "six",
                        title: "Creative Copywriting",
                        info: ["Most copy today is boring. There. We said it. It’s like having a conversation with one of your exes: dry, emotionless and makes you feel like you’re being taken advantage of. Luckily, our copywriting team at Relic has solved this issue.", "If you’ve ever seen a superhero movie, there’s always a moment where the hero realizes that they’re meant for something more. At Relic, we like to think of copywriting as our superhero moment. We showcase that our clients are meant for something more; we just use pens to demonstrate that, rather than guns, swords and orphaned children.", "Our copywriting team will write anything and everything for you – radio scripts, TV spots, billboard copy, direct mail pieces, emails or anything else you need. All your content needs will be handled by our supremely talented, extraordinarily attractive writers. (No I’m not one of them, why do you ask?)"]
                    }
                ]
            }
        ];

        $scope.lastNum = "";

        // $scope.servicesMobile = function(num, top){
        //
        //     let mobileExpand = document.getElementById('services-mobile-expand-' + num),
        //         mobileExpandLast = document.getElementById('services-mobile-expand-' + $scope.lastNum),
        //         contentMobile = document.getElementById('content-mobile-content-' + num),
        //         arrow = document.getElementById('mobile-expand-arrow-' + num),
        //         lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum),
        //         lastContentMobile = document.getElementById('content-mobile-content-' + $scope.lastNum),
        //         mainContainer = document.getElementById('services-main-container');
        //         // servicesMobile = document.getElementById('services-mobile');
        //
        //
        //     if( mobileExpand.style.height === "200vh" && num === $scope.lastNum ){
        //
        //         TweenMax.to(mobileExpand, 0, {
        //             color: "transparent"
        //         });
        //         TweenMax.to(mobileExpand, 0.5, {
        //             display: "none",
        //             height: 0
        //         });
        //         TweenMax.to(arrow, 0.75, {
        //             transform: "rotateX(0deg)"
        //         });
        //         TweenMax.to( mainContainer, 0.75, {
        //             height: "320vh"
        //         });
        //         // TweenMax.to(servicesMobile, 0.75, {
        //         //     height: "280vh"
        //         // });
        //         // TweenMax.to(contentMobile, 0.75, {
        //         //     marginBottom: "5vw"
        //         // });
        //
        //         return;
        //     }  if($scope.lastNum !== "" && num !== $scope.lastNum){
        //
        //         console.log(mobileExpandLast.style.height);
        //
        //         TweenMax.to(lastArrow, 0.75, {
        //             transform: "rotateX(0deg)"
        //         });
        //         TweenMax.to(lastContentMobile, 0.1, {
        //             marginBottom: "5vw"
        //         });
        //         TweenMax.to(mobileExpandLast, 0, {
        //            color: "transparent"
        //         });
        //         TweenMax.to(mobileExpandLast, 0.1, {
        //             display: "none",
        //             height: 0
        //         });
        //         // TweenMax.to(contentMobile, 0.25, {
        //         //     marginBottom: "200vh"
        //         // });
        //         TweenMax.to(mobileExpand, 0.5, {
        //             display: "flex",
        //             height: "200vh",
        //             color: "#bd9a35"
        //         });
        //         TweenMax.to(arrow, 0.75, {
        //             transform: "rotateX(180deg)"
        //         });
        //
        //         $scope.lastNum = num;
        //
        //         return;
        //
        //     }
        //
        //     TweenMax.to( mainContainer, 0.5, {
        //         height: "520vh"
        //     });
        //     // TweenMax.to(servicesMobile, 0.5, {
        //     //     height: "480vh"
        //     // });
        //     TweenMax.to(contentMobile, 0.5, {
        //         marginBottom: "200vh"
        //     });
        //     TweenMax.to(mobileExpand, 0.5, {
        //         display: "flex",
        //         height: "200vh",
        //         color: "#bd9a35"
        //     });
        //     TweenMax.to(arrow, 0.75, {
        //         transform: "rotateX(180deg)"
        //         });
        //
        //     $scope.lastNum = num;
        //
        // };

        $scope.servicesMobile = function(num, top){

            let mobileExpand = document.getElementById('services-mobile-expand-' + num),
                mobileExpandLast = document.getElementById('services-mobile-expand-' + $scope.lastNum),
                arrow = document.getElementById('mobile-expand-arrow-' + num),
                lastArrow = document.getElementById('mobile-expand-arrow-' + $scope.lastNum);


            if( mobileExpand.style.height === "auto" && num === $scope.lastNum ){

                TweenMax.to(mobileExpand, 0, {
                    color: "transparent"
                });
                TweenMax.to(mobileExpand, 0.5, {
                    height: 0
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(0deg)"
                });

                return;
            }  if($scope.lastNum !== "" && num !== $scope.lastNum){

                TweenMax.to(lastArrow, 0.75, {
                    transform: "rotateX(0deg)"
                });
                TweenMax.to(mobileExpandLast, 0.1, {
                    color: "transparent",
                    height: 0
                });
                TweenMax.to(mobileExpand, 0.5, {
                    height: "auto",
                    color: "#161616"
                });
                TweenMax.to(arrow, 0.75, {
                    transform: "rotateX(180deg)"
                });

                $scope.lastNum = num;

                return;

            }

            TweenMax.to(mobileExpand, 0.5, {
                height: "auto",
                color: "#161616"
            });
            TweenMax.to(arrow, 0.75, {
                transform: "rotateX(180deg)"
            });

            $scope.lastNum = num;

        };

        $scope.mobileInnerExpand = function(){
            console.log('Its working.....')
        }



    });
})();