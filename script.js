// ==UserScript==
// @name           Orcish inline tiers
// @namespace      Goldstar
// @description    Orcish script for tiers
// @author         Goldstar labs
// @include        https://stereolife.website/pub/*
// @include        https://armorgames.com/dawn-of-the-dragons-game/13509
// @version        0.0.2
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @connect        18.218.243.237

// ==/UserScript==
( function ( data ) {
    "use strict";
    // Colors
    var cl_ap_0 = '#E0E0A1';
    var cl_ap_1 = '#F7F7B8';

    var cl_os_0 = '#BEEBAA';
    var cl_os_1 = '#D1FFBD';

    var cl_row_0 = '';
    var cl_row_1 = '#D8D8D8';

    var cl_bor_0 = '#9C9C9C';
    var cl_back_0 = '#F5F5F5';

    var cl_raid_s = '#FEFEFE';
    var cl_raid_m = '#F4F400';
    var cl_raid_l = '#E27100';
    var cl_raid_e = '#F40000';
    var cl_raid_c = '#4E7DDE';
    var cl_raid_g = '#C30EC3';
    var cl_raid_p = '#5FF262';

    // Switches block between active and inactive
    var node_click = function ()
    {
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

        wrapper.appendChild ( document.createElement('div') );

        if ( src )
        {
            GM_xmlhttpRequest({
                method: 'GET',
                url: src,
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                onload: function(r)
                {
                    var table_content = document.createElement ('table');

                    table_content.style.padding = "0 0 0 0";
                    table_content.style.backgroundColor = cl_back_0;
                    table_content.style.borderSpacing = "0";
                    table_content.style.width = '100%';
                    table_content.style.border = 'thin solid ' + cl_bor_0;
                    table_content.setAttribute('border', 1);
                    table_content.style.borderCollapse = "collapse";

                    var table_body = document.createElement('tbody');

                    var parsed_response = JSON.parse(r.responseText);


                    /* parsing raids */
                    var i = 0;
                    for (var raid of parsed_response.raids)
                    {
                        console.log(raid.name);

                        var row_damage = document.createElement('tr');
                        var row_loot = document.createElement('tr');
                        var row_coeff = document.createElement('tr');

                        row_damage.style.textAlign = "center";
                        row_loot.style.textAlign = "center";
                        row_coeff.style.textAlign = "center";

                        if (i%2 == 1)
                        {
                            row_damage.style.backgroundColor = cl_row_1;
                            row_loot.style.backgroundColor = cl_row_1;
                            row_coeff.style.backgroundColor = cl_row_1;
                        }

                        i++;

                        var raid_name = document.createElement('td');
                        raid_name.setAttribute('rowspan', '3');
                        raid_name.appendChild(document.createTextNode(raid.name));

                        raid_name.style.textShadow = '1px 1px 1px black';

                      //  raid_name.style['-webkit-text-stroke'] = '1px black';

                        if (raid.size == 'small')
                        {
                            raid_name.style.color = cl_raid_s;
                        }
                        else
                        if (raid.size == 'medium')
                        {
                            raid_name.style.color = cl_raid_m;
                        }
                        else
                        if (raid.size == 'large')
                        {
                            raid_name.style.color = cl_raid_l;
                        }
                        else
                        if (raid.size == 'epic')
                        {
                            raid_name.style.color = cl_raid_e;
                        }
                        else
                        if (raid.size == 'colossal')
                        {
                            raid_name.style.color = cl_raid_c;
                        }
                        else
                        if (raid.size == 'gigantic')
                        {
                            raid_name.style.color = cl_raid_g;
                        }

                        row_damage.appendChild(raid_name);

                        table_body.appendChild(row_damage);
                        table_body.appendChild(row_loot);
                        table_body.appendChild(row_coeff);

                        /* AP OS MS */
                        row_damage.insertCell(-1).innerHTML = 'AP';
                        row_damage.insertCell(-1).innerHTML = raid.ap == null ? '' : raid.ap;

                        row_loot.insertCell(-1).innerHTML = 'OS';
                        row_loot.insertCell(-1).innerHTML = raid.os;

                        row_coeff.insertCell(-1).innerHTML = 'MS';
                        row_coeff.insertCell(-1).innerHTML = raid.ms;

                        /* Tiers data */
                        for (var tier of raid.tiers)
                        {
                        //    var damage = document.createElement('td');
                        //    damage.appendChild(document.createTextNode(tier.damage));

                            var damage = row_damage.insertCell(-1);
                            var loot = row_loot.insertCell(-1);
                            var coeff = row_coeff.insertCell(-1);

                            damage.innerHTML = tier.damage;

                             var loot_str = '';

                            if (tier.c.length > 0 || tier.u.length > 0 || tier.r.length > 0 || tier.e.length > 0)
                            {
                                loot_str += tier.c == undefined ? '' : tier.c;
                                loot_str += '/';

                                loot_str += tier.u == undefined ? '' : tier.u;
                                loot_str += '/';

                                loot_str += tier.r == undefined ? '' : tier.r;
                                loot_str += '/';

                                loot_str += tier.e == undefined ? '' : tier.e;
                            }

                            if (tier.stats.length > 0)
                            {
                                if (loot_str.length > 0)
                                {
                                    loot_str += ' ';
                                }

                                loot_str += tier.stats;
                            }


                            loot.innerHTML = loot_str;

                            coeff.innerHTML = tier.dmgsp;

                            if (raid.ap == tier.damage)
                            {
                                if (i%2 == 1)
                                {
                                    damage.style.backgroundColor = cl_ap_1;
                                    loot.style.backgroundColor = cl_ap_1;
                                    coeff.style.backgroundColor = cl_ap_1;
                                }
                                else
                                {
                                    damage.style.backgroundColor = cl_ap_0;
                                    loot.style.backgroundColor = cl_ap_0;
                                    coeff.style.backgroundColor = cl_ap_0;
                                }
                            }

                            if (raid.os == tier.damage)
                            {
                                if (i%2 == 1)
                                {
                                    damage.style.backgroundColor = cl_os_1;
                                    loot.style.backgroundColor = cl_os_1;
                                    coeff.style.backgroundColor = cl_os_1;
                                }
                                else
                                {
                                    damage.style.backgroundColor = cl_os_0;
                                    loot.style.backgroundColor = cl_os_0;
                                    coeff.style.backgroundColor = cl_os_0;
                                }
                            }
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
            [ "", ""] ,
            [ "Elite", "http://18.218.243.237:3000/rpc/tiers_v1?_name=&_type=Elite" ],
            [ "Deadly", "http://18.218.243.237:3000/rpc/tiers_v1?_name=&_type=Deadly" ],
            [ "Regular", "http://18.218.243.237:3000/rpc/tiers_v1?_name=&_type=Regular" ]
        ]
);