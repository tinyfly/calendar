"use strict";!function(e,t){"function"==typeof define&&define.amd?define(["jquery","moment"],t):"object"==typeof exports?module.exports=t(require("jquery"),require("moment")):e.Calendar=t(jQuery,moment)}(this,function(e,t){function a(a){var s=this;this.calIsOpen=!1,this.presetIsOpen=!1,this.element=a.element||e(".daterange"),this.type=this.element.hasClass("daterange--single")?"single":"double",this.selected=null,this.earliest_date=a.earliest_date?t(new Date(a.earliest_date)).startOf("day"):t(new Date("January 1, 1900")).startOf("day"),this.latest_date=a.latest_date?t(new Date(a.latest_date)).endOf("day"):t(new Date("December 31, 2900")).endOf("day"),this.end_date=a.end_date?new Date(a.end_date):"double"==this.type?new Date:null,this.start_date=a.start_date?new Date(a.start_date):"double"==this.type?new Date(t(this.end_date).subtract(1,"month")):null,this.current_date=a.current_date?new Date(a.current_date):"single"==this.type?new Date:null,this.callback=a.callback||this.calendarSetDates,this.same_day=a.same_day||!1,this.calendarHTML(this.type),e(".dr-presets",this.element).click(function(){s.presetToggle()}),e(".dr-list-item",this.element).click(function(){var t=e(".dr-item-aside",this).html().split("–");s.start_date=new Date(t[0]),s.end_date=new Date(t[1]),s.calendarSetDates(),s.presetToggle(),s.calendarSaveDates()}),e(".dr-date",this.element).on({click:function(){s.calendarOpen(this)},keyup:function(e){9!=e.keyCode||s.calIsOpen||s.start_date||s.end_date||s.calendarOpen(this)},keydown:function(a){switch(a.keyCode){case 9:e(s.selected).hasClass("dr-date-start")?(a.preventDefault(),e(".dr-date-end",s.element).trigger("click")):(s.calendarCheckDates(),s.calendarSaveDates(),s.calendarClose("force"));break;case 13:a.preventDefault(),s.calendarCheckDates(),s.calendarSetDates(),s.calendarSaveDates(),s.calendarClose("force");break;case 27:s.calendarSetDates(),s.calendarClose("force");break;case 38:a.preventDefault();var r="day";a.shiftKey&&(r="week"),a.metaKey&&(r="month");var d=t(s.current_date).subtract(1,r);e(this).html(d.format("MMMM D, YYYY")),s.current_date=d._d;break;case 40:a.preventDefault();var r="day";a.shiftKey&&(r="week"),a.metaKey&&(r="month");var i=t(s.current_date).add(1,r);e(this).html(i.format("MMMM D, YYYY")),s.current_date=i._d}}}),e(".dr-month-switcher i",this.element).click(function(){var a=e(".dr-month-switcher span",s.element).html(),r=e(".dr-year-switcher span",s.element).html(),d=t(new Date(a+" 1, "+r)).subtract(1,"month"),i=t(new Date(a+" 1, "+r)).add(1,"month").startOf("day");e(this).hasClass("dr-left")?(e(this).parent().find("span").html(d.format("MMMM")),s.calendarOpen(s.selected,d)):e(this).hasClass("dr-right")&&(e(this).parent().find("span").html(i.format("MMMM")),s.calendarOpen(s.selected,i))}),e(".dr-year-switcher i",this.element).click(function(){var a=e(".dr-month-switcher span",s.element).html(),r=e(".dr-year-switcher span",s.element).html(),d=t(new Date(a+" 1, "+r)).subtract(1,"year"),i=t(new Date(a+" 1, "+r)).add(1,"year").startOf("day");e(this).hasClass("dr-left")?(e(this).parent().find("span").html(d.format("YYYY")),s.calendarOpen(s.selected,d)):e(this).hasClass("dr-right")&&(e(this).parent().find("span").html(i.format("YYYY")),s.calendarOpen(s.selected,i))}),e(".dr-dates-dash",this.element).click(function(){e(".dr-date-start",s.element).trigger("click")}),e(this.element).click(function(t){e("html").one("click",function(){s.presetIsOpen&&s.presetToggle(),s.calIsOpen&&(s.calendarSetDates(),s.calendarClose("force"))}),t.stopPropagation()}),e(this.element).add(".dr-date",this.element).focus(function(t){e("html").one("click",function(){s.calIsOpen&&(s.calendarSetDates(),s.calendarClose("force"))}),t.stopPropagation()})}return a.prototype.presetToggle=function(){0==this.presetIsOpen?(this.presetIsOpen=!0,this.presetCreate()):this.presetIsOpen&&(this.presetIsOpen=!1),1==this.calIsOpen&&this.calendarClose(),e(".dr-preset-list",this.element).slideToggle(200),e(".dr-input",this.element).toggleClass("dr-active"),e(".dr-presets",this.element).toggleClass("dr-active")},a.prototype.presetCreate=function(){var a=this,s=this.latest_date,r=new Date(e(".dr-date-start",a.element).html()),d=new Date(e(".dr-date-end",a.element).html());this.start_date="Invalid Date"==r?this.start_date:r,this.end_date="Invalid Date"==d?this.end_date:d,e(".dr-list-item",this.element).each(function(){var r,d=e(this).data("months"),i=t(s).endOf("month").startOf("day"),n=i.isSame(s);return n||(i=t(s).subtract(1,"month").endOf("month").startOf("day")),"number"==typeof d?(r=t(s).subtract(n?d-1:d,"month").startOf("month"),12==d&&(r=t(s).subtract(n?12:13,"month").endOf("month").startOf("day"))):"all"==d?(r=t(a.earliest_date),i=t(a.latest_date)):(r=t(a.latest_date).subtract(30,"day"),i=t(a.latest_date)),r.isBefore(a.earliest_date)?e(this).remove():void e(".dr-item-aside",this).html(r.format("ll")+" – "+i.format("ll"))})},a.prototype.calendarSetDates=function(){if(e(".dr-date-start",this.element).html(t(this.start_date).format("MMMM D, YYYY")),e(".dr-date-end",this.element).html(t(this.end_date).format("MMMM D, YYYY")),!this.start_date&&!this.end_date){var a=e(".dr-date",this.element).html(),s=t(this.current_date).format("MMMM D, YYYY");a!=s&&e(".dr-date",this.element).html(s)}},a.prototype.calendarSaveDates=function(){return this.callback()},a.prototype.calendarCheckDates=function(){var a=e(".dr-date-start",this.element).html(),s=e(".dr-date-end",this.element).html(),r=e(this.selected).html(),d=/(?!<=\d)(st|nd|rd|th)/,i=a?a.replace(d,"").split(" "):[],n=s?s.replace(d,"").split(" "):[],l=r?r.replace(d,"").split(" "):[];return("ytd"==a||"ytd"==s)&&(a=t().startOf("year"),s=this.latest_date),("today"==a||"now"==a)&&(a=t().isAfter(this.latest_date)?this.latest_date:new Date),("today"==s||"now"==s)&&(s=t().isAfter(this.latest_date)?this.latest_date:new Date),("today"==r||"now"==r)&&(r=t().isAfter(this.latest_date)?this.latest_date:new Date),"earliest"==a&&(a=this.earliest_date),"earliest"==s&&(s=this.earliest_date),"earliest"==r&&(r=this.earliest_date),"latest"==a&&(a=this.latest_date),"latest"==s&&(s=this.latest_date),"latest"==r&&(r=this.latest_date),!a||-1==a.toString().indexOf("ago")&&-1==a.toString().indexOf("ahead")||(a=this.stringToDate(a)),!s||-1==s.toString().indexOf("ago")&&-1==s.toString().indexOf("ahead")||(s=this.stringToDate(s)),!r||-1==r.toString().indexOf("ago")&&-1==r.toString().indexOf("ahead")||(r=this.stringToDate(r)),2==i.length&&(i.push(t().format("YYYY")),a=i.join(" ")),2==n.length&&(n.push(t().format("YYYY")),s=n.join(" ")),2==l.length&&(l.push(t().format("YYYY")),r=l.join(" ")),a=new Date(a),s=new Date(s),r=new Date(r),(a||s)&&(t(a).isAfter(s)||t(s).isBefore(a)||t(a).isSame(s)&&!this.same_day||t(a).isBefore(this.earliest_date)||t(s).isAfter(this.latest_date))?this.calendarSetDates():(this.start_date="Invalid Date"==a?this.start_date:a,this.end_date="Invalid Date"==s?this.end_date:s,void(this.current_date="Invalid Date"==r?this.current_date:r))},a.prototype.stringToDate=function(e){var a=e.split(" ");return"ago"==a[2]?t(this.current_date).subtract(a[0],a[1]):"ahead"==a[2]?t(this.current_date).add(a[0],a[1]):this.current_date},a.prototype.calendarOpen=function(a,s){var r,d=this,i=e(".dr-dates",this.element).innerWidth()-8;this.selected=a||this.selected,1==this.presetIsOpen&&this.presetToggle(),1==this.calIsOpen&&this.calendarClose(s?"switcher":void 0),this.calendarCheckDates(),this.calendarCreate(s),this.calendarSetDates();var n=t(s||this.current_date).add(1,"month").startOf("month").startOf("day"),l=t(s||this.current_date).subtract(1,"month").endOf("month"),c=t(s||this.current_date).add(1,"year").startOf("month").startOf("day"),h=t(s||this.current_date).subtract(1,"year").endOf("month");e(".dr-month-switcher span",this.element).html(t(s||this.current_date).format("MMMM")),e(".dr-year-switcher span",this.element).html(t(s||this.current_date).format("YYYY")),e(".dr-switcher i",this.element).removeClass("dr-disabled"),n.isAfter(this.latest_date)&&e(".dr-month-switcher .dr-right",this.element).addClass("dr-disabled"),l.isBefore(this.earliest_date)&&e(".dr-month-switcher .dr-left",this.element).addClass("dr-disabled"),c.isAfter(this.latest_date)&&e(".dr-year-switcher .dr-right",this.element).addClass("dr-disabled"),h.isBefore(this.earliest_date)&&e(".dr-year-switcher .dr-left",this.element).addClass("dr-disabled"),e(".dr-day",this.element).on({mouseenter:function(){function a(a){r=void 0,d.range(42).forEach(function(i){var n=s.next().data("date"),l=s.prev().data("date"),c=s.data("date");if(!c)return!1;if(l||(l=c),n||(n=c),"start"==a){if(t(n).isSame(d.end_date)||d.same_day&&t(c).isSame(d.end_date))return!1;if(t(c).isAfter(d.end_date)&&(r=r||t(c).add(6,"day").startOf("day"),i>5||(n?t(n).isAfter(d.latest_date):!1)))return e(s).addClass("dr-end"),r=t(c),!1;s=s.next().addClass("dr-maybe")}else if("end"==a){if(t(l).isSame(d.start_date)||d.same_day&&t(c).isSame(d.start_date))return!1;if(t(c).isBefore(d.start_date)&&(r=r||t(c).subtract(6,"day"),i>5||(l?t(l).isBefore(d.earliest_date):!1)))return e(s).addClass("dr-start"),r=t(c),!1;s=s.prev().addClass("dr-maybe")}})}{var s=e(this);t(d.start_date),t(d.end_date),t(d.current_date)}e(d.selected).hasClass("dr-date-start")&&(s.addClass("dr-hover dr-hover-before"),e(".dr-start",d.element).css({border:"none","padding-left":"0.3125rem"}),a("start")),e(d.selected).hasClass("dr-date-end")&&(s.addClass("dr-hover dr-hover-after"),e(".dr-end",d.element).css({border:"none","padding-right":"0.3125rem"}),a("end")),d.start_date||d.end_date||s.addClass("dr-maybe"),e(".dr-selected",d.element).css("background-color","transparent")},mouseleave:function(){e(this).hasClass("dr-hover-before dr-end")&&e(this).removeClass("dr-end"),e(this).hasClass("dr-hover-after dr-start")&&e(this).removeClass("dr-start"),e(this).removeClass("dr-hover dr-hover-before dr-hover-after"),e(".dr-start, .dr-end",d.element).css({border:"",padding:""}),e(".dr-maybe:not(.dr-current)",d.element).removeClass("dr-start dr-end"),e(".dr-day",d.element).removeClass("dr-maybe"),e(".dr-selected",d.element).css("background-color","")},mousedown:function(){var a=e(this).data("date"),s=t(a).format("MMMM D, YYYY");r&&e(".dr-date",d.element).not(d.selected).html(r.format("MMMM D, YYYY")),e(d.selected).html(s),d.calendarOpen(d.selected),e(d.selected).hasClass("dr-date-start")?e(".dr-date-end",d.element).trigger("click"):(d.calendarSaveDates(),d.calendarClose("force"))}}),e(".dr-calendar",this.element).css("width",i).slideDown(200),e(".dr-input",this.element).addClass("dr-active"),e(a).addClass("dr-active").focus(),e(this.element).addClass("dr-active"),this.calIsOpen=!0},a.prototype.calendarClose=function(t){var a=this;return!this.calIsOpen||this.presetIsOpen||"force"==t?(e(".dr-date",this.element).blur(),e(".dr-calendar",this.element).slideUp(200,function(){e(".dr-day",a.element).remove()})):e(".dr-day",this.element).remove(),"switcher"==t?!1:(e(".dr-input, .dr-date",this.element).removeClass("dr-active"),e(this.element).removeClass("dr-active"),void(this.calIsOpen=!1))},a.prototype.calendarArray=function(e,a,s,r){var d=this;s=s||e||a;var i=t(r||s).startOf("month"),n=t(r||s).endOf("month"),l={start:{day:+i.format("d"),str:+i.format("D")},end:{day:+n.format("d"),str:+n.format("D")}},c=void 0,h=this.range(l.start.day).map(function(){return void 0==c&&(c=t(i)),c=c.subtract(1,"day"),{str:+c.format("D"),start:c.isSame(e),end:c.isSame(a),current:c.isSame(s),selected:c.isBetween(e,a),date:c.toISOString(),outside:c.isBefore(d.earliest_date),fade:!0}}).reverse(),o=42-(l.end.str+h.length);c=void 0;var m=this.range(o).map(function(){return void 0==c&&(c=t(n)),c=c.add(1,"day").startOf("day"),{str:+c.format("D"),start:c.isSame(e),end:c.isSame(a),current:c.isSame(s),selected:c.isBetween(e,a),date:c.toISOString(),outside:c.isAfter(d.latest_date),fade:!0}});c=void 0;var f=this.range(l.end.str).map(function(){return c=void 0==c?t(i):c.add(1,"day").startOf("day"),{str:+c.format("D"),start:c.isSame(e),end:c.isSame(a),current:c.isSame(s),selected:c.isBetween(e,a),date:c.toISOString(),outside:c.isBefore(d.earliest_date)||c.isAfter(d.latest_date),fade:!1}});return h.concat(f,m)},a.prototype.calendarCreate=function(t){var a=this,s=this.calendarArray(this.start_date,this.end_date,this.current_date,t);s.forEach(function(t,s){var r="dr-day";t.fade&&(r+=" dr-fade"),t.start&&(r+=" dr-start"),t.end&&(r+=" dr-end"),t.current&&(r+=" dr-current"),t.selected&&(r+=" dr-selected"),t.outside&&(r+=" dr-outside"),e(".dr-day-list",a.element).append('<li class="'+r+'" data-date="'+t.date+'">'+t.str+"</li>")})},a.prototype.calendarHTML=function(e){return this.element.append("double"==e?'<div class="dr-input"><div class="dr-dates"><div class="dr-date dr-date-start" contenteditable>'+t(this.start_date).format("MMMM D, YYYY")+'</div><span class="dr-dates-dash">–</span><div class="dr-date dr-date-end" contenteditable>'+t(this.end_date).format("MMMM D, YYYY")+'</div></div><div class="dr-presets"><span class="dr-preset-bar"></span><span class="dr-preset-bar"></span><span class="dr-preset-bar"></span></div></div><div class="dr-selections"><div class="dr-calendar" style="display: none;"><div class="dr-range-switcher"><div class="dr-switcher dr-month-switcher"><i class="dr-left"></i><span>April</span><i class="dr-right"></i></div><div class="dr-switcher dr-year-switcher"><i class="dr-left"></i><span>2015</span><i class="dr-right"></i></div></div><ul class="dr-days-of-week-list"><li class="dr-day-of-week">S</li><li class="dr-day-of-week">M</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">W</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">F</li><li class="dr-day-of-week">S</li></ul><ul class="dr-day-list"></ul></div><ul class="dr-preset-list" style="display: none;"><li class="dr-list-item" data-months="days">Last 30 days <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="1">Last month <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="3">Last 3 months <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="6">Last 6 months <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="12">Last year <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="all">All time <span class="dr-item-aside"></span></li></ul></div>':'<div class="dr-input"><div class="dr-dates"><div class="dr-date" contenteditable>'+t(this.current_date).format("MMMM D, YYYY")+'</div></div></div><div class="dr-selections"><div class="dr-calendar" style="display: none;"><div class="dr-range-switcher"><div class="dr-switcher dr-month-switcher"><i class="dr-left"></i><span></span><i class="dr-right"></i></div><div class="dr-switcher dr-year-switcher"><i class="dr-left"></i><span></span><i class="dr-right"></i></div></div><ul class="dr-days-of-week-list"><li class="dr-day-of-week">S</li><li class="dr-day-of-week">M</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">W</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">F</li><li class="dr-day-of-week">S</li></ul><ul class="dr-day-list"></ul></div></div>')},a.prototype.range=function(e){for(var t=new Array(e),a=0;e>a;a++)t[a]=a;return t},a});