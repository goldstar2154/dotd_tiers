// ==UserScript==
// @name           Orcish inline tiers
// @namespace      Goldstar
// @description    Orcish script for tiers
// @author         Goldstar labs
// @include        https://stereolife.website/pub/*
// @version        0.0.1
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @grant          GM_getResourceText

// ==/UserScript==
( function ( data ) {
    "use strict";


    /**
     * switches between active and inactive
     * @returns {undefined}
     */
    var node_click = function ()
    {
        console.log("test on_click");

        // Get current node status
        var status = this.getAttribute("class") === "active" ? "" : "active";
        // Reset all nodes status
        for (var counter = 0; counter < this.parentNode.childNodes.length; counter++)
        {
            this.parentNode.childNodes[counter].setAttribute ( "class", "" );
        }
        // Set active status to current node
        this.setAttribute ( "class", status );
        this.parentNode.setAttribute("active",status);
    };

    /**
     * creates a new element for the list
     * @param {string} label the name of the dataset
     * @param {string} src the image id
     * @param {Function} func the function to be called when clicked
     * @returns {unresolved}
     */
    var node_create = function(label, src, func)
    {
        var wrapper = document.createElement ( "li" );
        wrapper.onclick = func;

        if ( src )
        {
            GM_xmlhttpRequest({
                method: 'POST',
                url: 'http://18.218.243.237:3000/rpc/tiers_v1',
                data: '{ "_name" : "Deadly Drakontos" }',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                onload: function(r)
                {
                    wrapper.appendChild ( document.createElement('div') );

                    var table_content = document.createElement ('table');
                    table_content.style.padding = "0 0 0 0";
                    table_content.style.borderSpacing = "0";

                    table_content.style.width = '100%';
                    table_content.setAttribute('border', '1');
                    table_content.setAttribute('bgcolor', '#FFFFFF');

                    var table_body = document.createElement('tbody');

                    //GM_log('***' + r.responseText);

                    var parsed_response = JSON.parse(r.responseText);
                    parsed_response = JSON.parse(parsed_response);
     

                    console.log(JSON.parse(r.responseText));

                    console.log(JSON.parse("{\"raids\" : [{\"name\" : \"Deadly Drakontos\", \"type\" : \"deadly\", \"size\" : \"gigantic\", \"modifier\" : \"Deadly , Aquatic , Dragon , Terror\", \"campaign\" : \"\", \"AP\" : \"5t\", \"OS\" : \"5t\", \"MS\" : \"1q\", \"tiers\" : [{\"difficulty\" : \"nightmare\", \"damage\" : \"1000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"46000\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"5000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"240000\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"10000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"309335\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"20000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"325280\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"30000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"333756\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"40000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"345977\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"50000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"355076\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"100000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"523838\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"150000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"711242\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"200000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"738284\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"300000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"808848\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"400000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"973477\"},{\"difficulty\" : \"nightmare\", \"damage\" : \"600000000000000\", \"c\" : \"\", \"u\" : \"\", \"r\" : \"\", \"e\" : \"\", \"l\" : \"\", \"stats\" : \"1222249\"}]}]}"));

                    GM_log('parse end');

                    /* parsing raids */
                    var i = 0;
                    for (var raid of parsed_response.raids)
                    {
                        console.log(raid.name);

                        var row_damage = document.createElement('tr');
                        var row_loot = document.createElement('tr');
                        var row_coeff = document.createElement('tr');

                        if (i%2 == 1)
                        {
                            row_damage.style.backgroundColor = "#EDEDED";
                            row_loot.style.backgroundColor = "#EDEDED";
                            row_coeff.style.backgroundColor = "#EDEDED";
                        }

                        i++;

                        var raid_name = document.createElement('td');
                        raid_name.setAttribute('rowspan', '3');
                        raid_name.appendChild(document.createTextNode(raid.name));
                        row_damage.appendChild(raid_name);

                        table_body.appendChild(row_damage);
                        table_body.appendChild(row_loot);
                        table_body.appendChild(row_coeff);

                        /* AP OS MS */
                        var ap = document.createElement('td');
                        ap.appendChild(document.createTextNode(raid.AP));
                        row_damage.appendChild(ap);

                        var os = document.createElement('td');
                        os.appendChild(document.createTextNode(raid.OS));
                        row_loot.appendChild(os);

                        var ms = document.createElement('td');
                        ms.appendChild(document.createTextNode(raid.MS));
                        row_coeff.appendChild(ms);


                        for (var tier of raid.tiers)
                        {
                            //  console.log(tier);

                            var damage = document.createElement('td');
                            damage.appendChild(document.createTextNode(tier.damage));


                            var loot = document.createElement('td');

                            var loot_str = '';

                            if (tier.c.length > 0 && tier.u.length > 0 && tier.r.length > 0 && tier.e.length > 0)
                            {
                                loot_str += tier.c == undefined ? '' : tier.c;
                                loot_str += '/';

                                loot_str += tier.u == undefined ? '' : tier.u;
                                loot_str += '/';

                                loot_str += tier.r == undefined ? '' : tier.r;
                                loot_str += '/';

                                loot_str += tier.e == undefined ? '' : tier.e;
                            }

                            if (tier.sp != undefined)
                            {
                                if (loot_str.length > 0)
                                {
                                    loot_str += ' ';
                                }

                                loot_str += tier.sp;
                            }

                            loot.appendChild(document.createTextNode(loot_str));


                            var coeff = document.createElement('td');
                            coeff.appendChild(document.createTextNode(tier.ds));


                            if (raid.os == tier.damage)
                            {
                                if (i%2 == 1)
                                {
                                    damage.style.backgroundColor = "#D1FFBD";
                                    loot.style.backgroundColor = "#D1FFBD";
                                    coeff.style.backgroundColor = "#D1FFBD";
                                }
                                else
                                {
                                    damage.style.backgroundColor = "#BEEBAA";
                                    loot.style.backgroundColor = "#BEEBAA";
                                    coeff.style.backgroundColor = "#BEEBAA";
                                }
                            }

                            row_damage.appendChild(damage);
                            row_loot.appendChild(loot);
                            row_coeff.appendChild(coeff);
                        }

                    }

                    table_content.appendChild(table_body);

                    wrapper.firstChild.appendChild ( table_content );
                }});
        }

        if(label)
        {
          wrapper.appendChild ( document.createElement ( "button" ) );
          wrapper.lastChild.appendChild ( document.createTextNode ( label ) );
        }
        return wrapper;
    };

    var list = document.createElement ( "ul" );
    list.setAttribute ( "id", "NewInlineTierCharts" );

    list.appendChild ( node_create ( "\u21C6", "", function () {
        this.parentNode.setAttribute("class",( this.parentNode.getAttribute ( "class" ) === "right" ? "" : "right" ));
    } ) );

    /* Parsing input data and build menu */
    for (var node of data)
    {
        list.appendChild(node_create(node[0], node[1], node_click));
    }
    /*
    for (var counter = 0; counter < data.length; counter++)
    {
        list.appendChild(node_create(data[counter][0], data[counter][1], node_click));
    }
    */

    var styles = document.createElement ( "style" );
    styles.setAttribute ( "type", "text/css" );
    styles.setAttribute ( "id", "NewInlineTierChartsStyles" );
    styles.appendChild ( document.createTextNode (
            "#NewInlineTierCharts{position:fixed;top:0;left:-65px;z-index:100000;max-height:100%;}" +
            "#NewInlineTierCharts:hover,#NewInlineTierCharts[active=\"active\"]{left:0;}" +
            "#NewInlineTierCharts.right{left:auto;right:-65px;}" +
            "#NewInlineTierCharts.right:hover,#NewInlineTierCharts.right[active=\"active\"]{right:0;}" +
            "#NewInlineTierCharts,#NewInlineTierCharts li{margin:0;padding:0;list-style: none;display:block;}" +
            "#NewInlineTierCharts li{min-height:0.25em;}" +
            "#NewInlineTierCharts img{width:auto;height:auto;display:block;background-color:#fff;}" +
            "#NewInlineTierCharts div{width:auto;max-height:100%;display:none;overflow:auto;}" +
            "#NewInlineTierCharts button{border-radius:2px;background:#fff;height:auto;font-size: 12px;font-family: monospace;padding:1px;text-align: center;box-sizing: border-box;text-align:center;color:#000;border: 1px solid #000;width:75px;display:block;background-color:#fff;background-image:linear-gradient(to bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.2),rgba(0,0,0,0.1));font-weight:normal;line-height:normal;}" +
            "#NewInlineTierCharts .active div{display:block;position:fixed;top:0;left:75px;z-index:100000;max-height:100%;max-width:"+(window.innerWidth-150)+"px;}" +
            "#NewInlineTierCharts.right .active div{left:auto;right:75px;}" +
            "#NewInlineTierCharts .active button{background:#222;color:#fff;}"
            ) );
    window.addEventListener('resize',function() {
        document.getElementById("NewInlineTierChartsStyles").innerHTML = document.getElementById("NewInlineTierChartsStyles").innerHTML.replace(/(#NewInlineTierCharts .active div\{.*?max-width:)[0-9]+(px;.*?\})/,'$1'+(window.innerWidth-150)+'$2');
    });
    document.getElementsByTagName ( "head" )[0].appendChild ( styles );
    document.getElementsByTagName ( "body" )[0].appendChild ( list );
} ) (
        [
            [ "Elite", "elite query" ]
        ]
);



