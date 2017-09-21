/**
 * Created by Seth on 8/14/2017.
 */
(function(){
    angular.module('app').controller('contactCtrl', function($scope, mainService){



        $scope.backgroundImage = mainService.backgrounds[Math.floor(Math.random() * (11 - 1 + 1)) + 1];

        let backgroundPic = document.getElementById('contact-background');

        window.onscroll = function() {
            let offSet = window.pageYOffset,
                csParaStart = offSet * 0.5050505050505050;

            // backgroundPic.style.bottom = csParaStart + "px";
            mainService.navBackground(offSet);
            mainService.parallaxIt(backgroundPic,csParaStart);
        };

        $scope.contactRelic = function(contact){
            mainService.contactRelic(contact).then(function(response){
                console.log(response);
            })
        };



        ///*******************  Google Analytics Legacy Tracking Code  *******************/


               let source, medium, term, content,campaign, session_count, pageview_count;

        let hostname = document.location.hostname;
        console.log(hostname);
        hostname = hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
        hostname = hostname.toLowerCase();

        let _gaq = _gaq || [];
// DON'T UPDATE THE GA ACCOUNT ID - Your site should be tracked using Universal Analytics outside this JavaScript code
        _gaq.push(['sfga._setAccount', 'UA-XXXYYYZZZ-1']);
        _gaq.push(['sfga._setDomainName', hostname]);
        _gaq.push(['sfga._setAllowLinker', true]);
        _gaq.push(['sfga._trackPageview']);
        _gaq.push(function(){get_campaign_info();});

        (function() {
            let ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

        /*******************  Set Up Cross Domain Tracking  *******************/

        let arr = document.getElementsByTagName("a");

        for(let i=0; i < arr.length; i++)
        {
            let tmp = arr[i].getAttribute("onclick");
            let doname ="";
            try
            {
                doname = arr[i].hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
                doname = doname.toLowerCase();
            }
            catch(err)
            {
                doname = arr[i].href;
            }

            if (tmp !== null)
            {
                tmp = String(tmp);
                if (tmp.indexOf('_gasf.push') > -1)
                    continue;
            }

            for (let j = 0; j < domains.length; j++)
            {
                //Auto-Linker
                if ( doname !== hostname && doname.indexOf(domains[j]) !== -1 && doname.indexOf("mailto:") === -1)
                {

                    arr[i].setAttribute("onclick",""+((tmp !== null) ? tmp + '; ' : '')+"_gaq.push(['sfga._link', '"+arr[i].href+"']); return false;");
                }
            }
        }

        /*******************  Set Up Cross Domain Tracking  *******************/

//This function extracts the "_utma", "_utmb", "_utmc" and "_utmz" strings from the cookies set by Google Analytics
//This function was originally written by the Google Analytics team (urchin.js)

        function get_campaign_info()
        {
            let utma = get_utm_value(document.cookie, '__utma=', ';');
            let utmb = get_utm_value(document.cookie, '__utmb=', ';');
            let utmc = get_utm_value(document.cookie, '__utmc=', ';');
            let utmz = get_utm_value(document.cookie, '__utmz=', ';');

            source = get_utm_value(utmz, 'utmcsr=', '|');
            medium = get_utm_value(utmz, 'utmcmd=', '|');
            term = get_utm_value(utmz, 'utmctr=', '|');
            content = get_utm_value(utmz, 'utmcct=', '|');
            campaign = get_utm_value(utmz, 'utmccn=', '|');
            gclid = get_utm_value(utmz, 'utmgclid=', '|');

            session_count = get_session_count(utma);
            pageview_count = get_pageview_count(utmb, utmc);

            if (gclid !== "-") {
                source = 'google';
                medium = 'cpc';
            }

            console.log(source, medium, term, content,campaign, session_count, pageview_count);
        }

        function get_utm_value(l,n,s)
        {
            if (!l || l === "" || !n || n === "" || !s || s === "") return "-";
            let i, j, k, utm="-";
            i=l.indexOf(n);
            k=n.indexOf("=")+1;

            if (i > -1)
            {
                j=l.indexOf(s,i);
                if (j < 0)
                {
                    j=l.length;
                }
                utm=l.substring((i+k),j);
            }
            return utm;
        }

//This function extracts the "Count of Sessions" value from the _utma cookie
        function get_session_count(str)
        {
            let i, vc='-';
            if (str !== '-') {
                i = str.lastIndexOf(".");
                i++;
                vc = str.substring(i);
            }
            return vc;
        }

//This function extracts the "Count of Pageviews" value from the _utmb cookie
        function get_pageview_count(utmb,utmc)
        {
            let i, j, pc='-';
            if(utmb !== '-' && utmc !== '-'){
                utmc=utmc+'.';

                i=utmc.length;
                j=utmb.indexOf(".", i);
                pc=utmb.substring(i,j);
            }
            return pc;
        }


    });
})();