import React from "react";
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable"
import sanitizeHtml from "sanitize-html";
import { v4 as uuid } from "uuid";
const shortcut = require("./shortcut.js").shortcut;
console.log(shortcut);


var board = {};
var users = {};
var idCurrent;
var idAvailable;
//var columns = {};
var preferencies = {
  theme: "dark",
  warnOnDelete: true
};

const FONT_SIZE = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));

const ICON_DESCRIPTION = <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none"><line x1="0" y1="8" x2="64" y2="8" /><line x1="0" y1="32" x2="64" y2="32" /><line x1="0" y1="56" x2="48" y2="56" /></svg>;
const ICON_PLUS = <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none"><line x1="32" y1="7" x2="32" y2="57" /><line x1="7" y1="32" x2="57" y2="32" /></svg>;
const ICON_UNLOCKED = <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none"><circle cx="32" cy="32" r="24.86" /><path d="M32,6.84A34.09,34.09,0,0,1,43.66,32.31c0,16.19-7.28,21-11.66,24.24" /><path d="M32,6.84A34.09,34.09,0,0,0,20.31,32.31c0,16.19,7.28,21,11.66,24.24" /><line x1="10.37" y1="19.75" x2="53.75" y2="19.75" /><line x1="32" y1="6.84" x2="32" y2="56.55" /><line x1="11.05" y1="45.33" x2="52.98" y2="45.33" /><line x1="7.14" y1="32.31" x2="56.86" y2="31.69" /></svg>;
const ICON_OPTIONS = <svg style={{ width: '0.15rem' }} viewBox="28 0 8 64" strokeWidth="6" stroke="currentColor" fill="none"><line x1="28" y1="8" x2="36" y2="8" /><line x1="28" y1="32" x2="36" y2="32" /><line x1="28" y1="56" x2="36" y2="56" /></svg>;
const ICON_DROPDOWN_ARROW = <svg strokeWidth="8" viewBox="0 0 13.409 8.091"><g transform="translate(0.688 0.726)"><path d="M6.53,18.86l6.279,5.956L18.53,18.86" transform="translate(-6.53 -18.86)" fill="none" stroke="currentColor" strokeWidth="2" /></g></svg>;
const ICON_CHECK = <svg strokeWidth="6" viewBox="0 0 17.75 17.75"><g transform="translate(0.875 0.875)"><circle cx="8" cy="8" r="8" fill="none" stroke="currentColor" strokeWidth="1.75" /><path d="M15.79,24.834l3.488,2.637,6.163-8.651" transform="translate(-12.916 -14.988)" fill="none" stroke="currentColor" strokeWidth="1.75" /></g></svg>;
const ICON_CALENDAR = <svg viewBox="-1 -1 18 19.785"><g transform="translate(0 1.785)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="16" height="16" rx="1.75" stroke="currentColor" strokeWidth="1.75" /><rect x="0.875" y="0.875" width="14.25" height="14.25" rx="0.875" fill="none" /></g><line x2="16" transform="translate(0 5.712)" fill="none" stroke="currentColor" strokeWidth="1.75" /><line y1="2.427" transform="translate(3.609)" fill="none" stroke="currentColor" strokeWidth="1.75" /><line y1="2.427" transform="translate(12.162)" fill="none" stroke="currentColor" strokeWidth="1.75" /><g transform="translate(3.188 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none" /><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" /></g><g transform="translate(6.853 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none" /><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" /></g><g transform="translate(10.472 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none" /><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" /></g><g transform="translate(3.252 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none" /><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" /></g><g transform="translate(6.92 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none" /><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" /></g><g transform="translate(10.538 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75"><rect width="2.195" height="2.195" stroke="none" /><rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" /></g></svg>;
const ICON_SCHEDULLE = <svg strokeWidth="6" viewBox="0 0 17.5 18.105"><g transform="translate(0.75 0.75)"><path d="M15.8,23.609H7.127a.78.78,0,0,1-.777-.764V10.407a.777.777,0,0,1,.777-.777H19.552a.777.777,0,0,1,.777.777v6.986" transform="translate(-6.35 -8.071)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /><line x2="13.979" transform="translate(0 4.99)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /><line y1="1.559" transform="translate(3.153)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /><line y1="1.559" transform="translate(10.626)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /><circle cx="3.877" cy="3.877" r="3.877" transform="translate(8.246 8.851)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /><path d="M45.22,36.7v2.844l1.357,1.042" transform="translate(-33.097 -26.698)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></g></svg>;
const ICON_TAG = <svg strokeWidth="6" viewBox="0 0 19.5 19.345"><g transform="translate(1.75 1.75)"><g transform="translate(-7.42 -7.85)" fill="none" strokeLinecap="square"><path d="M7.42,14.558V8.165a.315.315,0,0,1,.315-.315h7.122a.331.331,0,0,1,.224.091l8.244,8.247a.315.315,0,0,1,0,.451L15.973,23.6a.315.315,0,0,1-.451,0L7.5,14.773A.337.337,0,0,1,7.42,14.558Z" stroke="none" /><path d="M 7.735389709472656 7.850000381469727 C 7.561208724975586 7.850000381469727 7.420000076293945 7.991209030151367 7.420000076293945 8.165390014648438 L 7.420000076293945 14.55834007263184 C 7.421428680419922 14.63722038269043 7.450439453125 14.71310043334961 7.501998901367188 14.7728099822998 L 15.52236938476563 23.60055923461914 C 15.58169937133789 23.6612491607666 15.66299915313721 23.69545936584473 15.74786949157715 23.69545936584473 C 15.83273887634277 23.69545936584473 15.91402912139893 23.6612491607666 15.97336959838867 23.60055923461914 L 23.32510948181152 16.6399097442627 C 23.38578796386719 16.58057975769043 23.41999816894531 16.4992790222168 23.41999816894531 16.41440963745117 C 23.41999816894531 16.32952880859375 23.38578796386719 16.24823951721191 23.32510948181152 16.18890953063965 L 15.08081912994385 7.941459655761719 C 15.02037906646729 7.883829116821289 14.94039916992188 7.851160049438477 14.85688877105713 7.850000381469727 L 7.735389709472656 7.850000381469727 M 7.735389709472656 6.100000381469727 L 14.85688877105713 6.100000381469727 L 14.86903953552246 6.100000381469727 L 14.88119888305664 6.100170135498047 C 15.407639503479 6.107479095458984 15.90741920471191 6.311599731445313 16.28845977783203 6.674930572509766 L 16.30365943908691 6.689420700073242 L 16.31848907470703 6.704259872436523 L 24.55835151672363 14.94728088378906 C 24.94723701477051 15.33273124694824 25.16999816894531 15.8666353225708 25.16999816894531 16.41440963745117 C 25.16999816894531 16.96677017211914 24.94348907470703 17.50502967834473 24.54854965209961 17.89118957519531 L 24.53849983215332 17.90102005004883 L 24.52827835083008 17.91069030761719 L 17.18978881835938 24.85879516601563 C 16.80645179748535 25.23223876953125 16.2838020324707 25.44545936584473 15.74786949157715 25.44545936584473 C 15.19544887542725 25.44545936584473 14.65714836120605 25.21891021728516 14.27098846435547 24.82390022277832 L 14.24862861633301 24.8010196685791 L 14.22711944580078 24.7773494720459 L 6.206748962402344 15.94960021972656 L 6.191898345947266 15.93325996398926 L 6.177469253540039 15.91654968261719 C 5.85923957824707 15.54800033569336 5.679109573364258 15.07691955566406 5.670289993286133 14.59005928039551 L 5.670000076293945 14.57419967651367 L 5.670000076293945 14.55834007263184 L 5.670000076293945 8.165390014648438 C 5.670000076293945 7.026529312133789 6.596529006958008 6.100000381469727 7.735389709472656 6.100000381469727 Z" stroke="none" fill="currentColor" /></g><g transform="translate(2.801 2.575)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75"><circle cx="1.224" cy="1.224" r="1.224" stroke="none" /><circle cx="1.224" cy="1.224" r="2.099" fill="none" /></g></g></svg>;
const ICON_ADD_TAG = <svg strokeWidth="6" viewBox="0 0 28 28"><g transform="translate(2 2)"><g fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="24" height="24" stroke="none" /><rect x="-1" y="-1" width="26" height="26" fill="none" /></g><g transform="translate(4 4)"><line y2="16" transform="translate(8)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x2="16" transform="translate(0 8)" fill="none" stroke="currentColor" strokeWidth="1.5" /></g></g></svg>;
const ICON_ASSIGNEES = <svg strokeWidth="6" viewBox="0 0 19.5 14.363"><g transform="translate(0.75 0.75)"><circle cx="2.77" cy="2.77" r="2.77" transform="translate(2.851)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" /><path d="M18.8,40.345A5.605,5.605,0,0,0,13.2,34.74h0A5.605,5.605,0,0,0,7.59,40.345Z" transform="translate(-7.59 -27.482)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" /><circle cx="2.231" cy="2.231" r="2.231" transform="translate(11.244 2.253)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" /><path d="M38.38,42.214h6.645A4.514,4.514,0,0,0,40.5,37.7h0a5.375,5.375,0,0,0-2.307.623" transform="translate(-27.025 -29.351)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" /></g></svg>;
const ICON_ADD_USER = <svg strokeWidth="6" viewBox="0 0 36 36"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="18" cy="18" r="18" stroke="none" /><circle cx="18" cy="18" r="17" fill="none" /></g><g transform="translate(10 10)"><line y2="16" transform="translate(8)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x2="16" transform="translate(0 8)" fill="none" stroke="currentColor" strokeWidth="1.5" /></g></svg>;
const ICON_ARROW_RIGHT = <svg viewBox="0 0 19.41 15.149"><g transform="translate(0 0.688)"><line x1="18" transform="translate(0 7.129)" fill="none" stroke="currentColor" strokeWidth="1.75" /><path d="M38.55,14.63l6.824,7.192L38.55,28.369" transform="translate(-27.374 -14.63)" fill="none" stroke="currentColor" strokeWidth="1.75" /></g></svg>;
const ICON_DUPLICATE = <svg viewBox="0 0 17.752 19.052"><g transform="translate(0.875 0.875)"><rect width="13.001" height="14.124" rx="1.25" transform="translate(0 3.177)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.75" /><path d="M19.348,11.27v-.437a1.345,1.345,0,0,1,1.276-1.4h10.3a1.345,1.345,0,0,1,1.276,1.4V22.151a1.345,1.345,0,0,1-1.276,1.4h-.441" transform="translate(-16.197 -9.43)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.75" /></g></svg>;
const ICON_ATTACH = <svg viewBox="0 0 15.717 17.443"><path d="M25.171,17.179l-6.447,6.44a4.474,4.474,0,0,1-6.074-.163C10.9,21.7,10.605,19.2,12.306,17.444c1.813-1.875,5.526-5.526,7.506-7.506a2.953,2.953,0,0,1,4.413.025,2.928,2.928,0,0,1,0,4.286L17.2,21.3a1.672,1.672,0,0,1-2.5-.022,1.722,1.722,0,0,1,.131-2.415l6.527-6.487" transform="translate(-10.198 -8.053)" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
const ICON_SAVE_TEMPLATE = <svg viewBox="0 0 15.5 19.054"><g transform="translate(0.75 0.75)"><path d="M18.891,21.977H11.06V10.05l4-4.3h8.577V17.008" transform="translate(-11.06 -5.75)" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M15.066,5.75l-.007,4.3h-4" transform="translate(-11.06 -5.75)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x2="4.016" transform="translate(1.722 13.351)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x2="5.019" transform="translate(1.722 11.168)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x2="9.031" transform="translate(1.722 9.128)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x2="9.031" transform="translate(1.722 7.089)" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="3.347" cy="3.347" r="3.347" transform="translate(7.306 10.86)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line y2="3.665" transform="translate(10.653 12.375)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line x2="3.661" transform="translate(8.824 14.207)" fill="none" stroke="currentColor" strokeWidth="1.5" /></g></svg>;
const ICON_STAR = <svg viewBox="0 0 19.77 18.578"><path d="M17.691,10.17l2.619,5.2a.211.211,0,0,0,.161.115l5.836.831a.218.218,0,0,1,.115.383L22.21,20.717a.214.214,0,0,0-.061.2l1,5.7a.214.214,0,0,1-.31.23L17.6,24.16a.226.226,0,0,0-.2,0l-5.235,2.681a.214.214,0,0,1-.31-.23l1-5.7a.214.214,0,0,0-.061-.2L8.576,16.688a.218.218,0,0,1,.115-.383l5.844-.831a.211.211,0,0,0,.161-.115l2.612-5.189a.214.214,0,0,1,.383,0Z" transform="translate(-7.614 -9.177)" fill="none" stroke="currentColor" strokeWidth="1.75" /></svg>;
const ICON_TRASH = <svg viewBox="0 0 28.646 35"><g transform="translate(1 1)"><path d="M35.987,43.15H17.54a.683.683,0,0,1-.683-.683L15.49,17.87H38.016l-1.366,24.6A.683.683,0,0,1,35.987,43.15Z" transform="translate(-13.447 -10.15)" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M38.8,16.275H12.842c-.191,0-.342-.109-.342-.239l.635-2.972a.335.335,0,0,1,.342-.2H38.169a.335.335,0,0,1,.342.2l.635,2.972C39.146,16.166,39,16.275,38.8,16.275Z" transform="translate(-12.5 -8.562)" fill="none" stroke="currentColor" strokeWidth="2.5" /><line y2="17.081" transform="translate(7.857 11.526)" fill="none" stroke="currentColor" strokeWidth="2.5" /><line y2="17.081" transform="translate(13.323 11.526)" fill="none" stroke="currentColor" strokeWidth="2.5" /><line y2="17.081" transform="translate(18.789 11.526)" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M25.73,10.868V7.253a.683.683,0,0,1,.683-.683h7.2a.683.683,0,0,1,.683.683v3.614" transform="translate(-16.691 -6.57)" fill="none" stroke="currentColor" strokeWidth="2.5" /></g></svg>;
const ICON_INFO = <svg viewBox="0 0 34 34"><g transform="translate(1 1)"><line y1="0.383" transform="translate(16.04 8.548)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.75" /><line y1="8.635" x2="0.1" transform="translate(16.04 16.14)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.75" /><circle cx="16" cy="16" r="16" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.75" /></g></svg>;
const ICON_SHARE = <svg viewBox="0 0 29.211 34"><g transform="translate(1 1)"><ellipse cx="4.436" cy="4.354" rx="4.436" ry="4.354" transform="translate(18.339)" fill="none" stroke="currentColor" strokeWidth="1.75" /><ellipse cx="4.436" cy="4.197" rx="4.436" ry="4.197" transform="translate(0 11.803)" fill="none" stroke="currentColor" strokeWidth="1.75" /><ellipse cx="4.436" cy="4.354" rx="4.436" ry="4.354" transform="translate(18.339 23.292)" fill="none" stroke="currentColor" strokeWidth="1.75" /><line y1="6.995" x2="11.015" transform="translate(8.078 6.688)" fill="none" stroke="currentColor" strokeWidth="1.75" /><line x2="11.015" y2="6.995" transform="translate(8.078 18.317)" fill="none" stroke="currentColor" strokeWidth="1.75" /></g></svg>;
const ICON_BIN = <svg viewBox="0 0 28.646 35"><g transform="translate(1 1)"><path d="M35.987,43.15H17.54a.683.683,0,0,1-.683-.683L15.49,17.87H38.016l-1.366,24.6A.683.683,0,0,1,35.987,43.15Z" transform="translate(-13.447 -10.15)" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M38.8,16.275H12.842c-.191,0-.342-.109-.342-.239l.635-2.972a.335.335,0,0,1,.342-.2H38.169a.335.335,0,0,1,.342.2l.635,2.972C39.146,16.166,39,16.275,38.8,16.275Z" transform="translate(-12.5 -8.562)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line y2="17.081" transform="translate(7.857 11.526)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line y2="17.081" transform="translate(13.323 11.526)" fill="none" stroke="currentColor" strokeWidth="1.5" /><line y2="17.081" transform="translate(18.789 11.526)" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M25.73,10.868V7.253a.683.683,0,0,1,.683-.683h7.2a.683.683,0,0,1,.683.683v3.614" transform="translate(-16.691 -6.57)" fill="none" stroke="currentColor" strokeWidth="1.5" /></g></svg>;
const ICON_COPY = <svg viewBox="0 0 17.752 19.052"><g transform="translate(0.875 0.875)"><rect width="13.001" height="14.124" rx="1.25" transform="translate(0 3.177)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.0" /><path d="M19.348,11.27v-.437a1.345,1.345,0,0,1,1.276-1.4h10.3a1.345,1.345,0,0,1,1.276,1.4V22.151a1.345,1.345,0,0,1-1.276,1.4h-.441" transform="translate(-16.197 -9.43)" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.0" /></g></svg>;
const ICON_CROSS = <svg viewBox="0 0 31.422 31.406"><g transform="translate(0.711 0.703)"><line x2="29.668" y2="30" fill="none" stroke="currentColor" strokeWidth="1.75" /><line x1="29.668" y2="30" transform="translate(0.332)" fill="none" stroke="currentColor" strokeWidth="1.75" /></g></svg>;
const ICON_LINK = <svg viewBox="0 0 15.25 19.032"><g transform="translate(0.125 0.125)"><g><path d="M12.67,2a2,2,0,0,1,1.985,1.777h1.567a2,2,0,0,1,2,1.863l0,.137v7.333H16.889V5.778a.667.667,0,0,0-.576-.661l-.09-.006H14.327a2,2,0,0,1-1.658.883H9.553a2,2,0,0,1-1.658-.883H6a.667.667,0,0,0-.661.576l-.006.09v12A.675.675,0,0,0,6,18.455v1.327a2,2,0,0,1-2-1.863l0-.137v-12a2,2,0,0,1,1.863-2l.137,0H7.568A2,2,0,0,1,9.553,2Zm2.108,12.111h.889a3.333,3.333,0,0,1,.18,6.662l-.177,0-.889,0a.667.667,0,0,1-.1-1.327l.09-.006.892,0a2,2,0,0,0,.137-4l-.137,0h-.889a.667.667,0,0,1-.09-1.327l.09-.006h0Zm-4.444,0h.889a.667.667,0,0,1,.09,1.327l-.09.006h-.889a2,2,0,0,0-.137,4l.137,0h.889a.667.667,0,0,1,.09,1.327l-.09.006h-.889a3.333,3.333,0,0,1-.177-6.662l.177,0h0Zm0,2.667h5.333a.667.667,0,0,1,.09,1.327l-.09.006H10.333a.667.667,0,0,1-.09-1.327l.09-.006h0ZM12.67,3.333H9.553a.664.664,0,1,0,0,1.327H12.67a.664.664,0,1,0,0-1.327Z" transform="translate(-4 -2)" stroke="currentColor" fill="currentColor" strokeWidth="0.5" /></g></g></svg>;
const ICON_FORWARD = <svg viewBox="0 0 18.893 17.766"><g transform="translate(0.875 0.891)"><path d="M10.272,20.66h3.194v6.308H10.272a.762.762,0,0,1-.762-.762V21.422A.762.762,0,0,1,10.272,20.66Z" transform="translate(-9.51 -16.986)" fill="none" stroke="currentColor" strokeWidth="1.75" /><path d="M19.89,21V14.694s1.666.038,4.436,0,6.014-1.791,8.122-3.583a.381.381,0,0,1,.629.286V24.314a.381.381,0,0,1-.614.3c-1.357-1.067-4.734-3.453-8-3.552C22.546,21,21,21,19.89,21Z" transform="translate(-15.934 -11.02)" fill="none" stroke="currentColor" strokeWidth="1.75" /><path d="M18.463,43.234H16.633a.762.762,0,0,1-.762-.762L15.49,37.22h3.354l.381,5.252A.762.762,0,0,1,18.463,43.234Z" transform="translate(-13.211 -27.234)" fill="none" stroke="currentColor" strokeWidth="1.75" /></g></svg>;
const ICON_ARCHIVE = <svg viewBox="0 0 18.5 14.264"><g transform="translate(0.25 0.25)"><path d="M17.473,60.25H.527A.527.527,0,0,0,0,60.777v3.177a.527.527,0,0,0,.527.527h.532v9a.527.527,0,0,0,.527.527H16.414a.527.527,0,0,0,.527-.527v-9h.532A.527.527,0,0,0,18,63.955V60.777A.527.527,0,0,0,17.473,60.25ZM15.886,72.959H2.114V64.482H15.886Zm1.059-9.532H1.055V61.3H16.945Z" transform="translate(0 -60.25)" stroke="currentColor" fill="currentColor" strokeWidth="0.5" /><path d="M182.336,214.048h2.118a1.586,1.586,0,0,0,0-3.173h-2.118a1.586,1.586,0,0,0,0,3.173Zm0-2.118h2.118a.532.532,0,0,1,0,1.063h-2.118a.532.532,0,0,1,0-1.063Z" transform="translate(-174.396 -205.58)" stroke="currentColor" fill="currentColor" strokeWidth="0.5" /></g></svg>;
const ICON_SUBSCRIBE = <svg viewBox="0 0 16.17 19.5"><g transform="translate(0.75 0.75)"><path d="M12,26.816V24.96A1.9,1.9,0,0,0,13.852,23.1V17.237a4.875,4.875,0,0,1,5.237-4.867c4.647,0,5.747,2.707,5.747,4.691v6.374s-.136,1.54,1.834,1.54v1.834Z" transform="translate(-12 -10.569)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" /><path d="M30.958,9.4V8.894a1.434,1.434,0,1,0-2.868,0v.462" transform="translate(-22.189 -7.46)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" /><path d="M29.946,51.76a1.753,1.753,0,1,1-3.506,0" transform="translate(-21.144 -35.513)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" /></g></svg>;
const ICON_EDIT = <svg aviewBox="0 0 18.002 18.055"><g transform="translate(1.002 1)"><path d="M10.353,23.206l-.277,2.448a.365.365,0,0,0,.4.4l2.434-.281a.365.365,0,0,0,.215-.106L25.859,12.9a.73.73,0,0,0,0-1.033l-1.638-1.645a.73.73,0,0,0-1.036,0L10.459,22.994a.365.365,0,0,0-.106.212Z" transform="translate(-10.073 -10.008)" fill="none" stroke="currentColor" strokeWidth="2"/><line x2="2.638" y2="2.714" transform="translate(11.397 1.934)" fill="none" stroke="currentColor" strokeWidth="2"/></g></svg>;


class BinaryHeap {

  constructor() {
    this.heap = [];
    this.size = this.heap.length;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
    this.size = this.heap.length;
  }

  isEmpty() {
    return (this.heap.length === 0);
  }

  pop() {
    let min = this.heap[0];
    if (this.heap.length === 1) {
      this.heap = [];
    }
    else {
      this.heap[0] = this.heap.pop();
      this.sinkDown(0);
    }
    this.size = this.heap.length;
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (parent <= element)
        break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let largest = index;
    const length = this.heap.length;

    // if left child is smaller than parent
    if (left <= length && this.heap[left] < this.heap[largest]) {
      largest = left;
    }
    // if right child is smaller than parent
    if (right <= length && this.heap[right] < this.heap[largest]) {
      largest = right;
    }
    // swap
    if (largest !== index) {
      [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
      this.sinkDown(largest);
    }

  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const getUUID = uuid;

function getCardID() {
  let id;
  if (idAvailable.isEmpty()) {
    id = idCurrent;
    idCurrent++;
    return (id);
  }
  else {
    return (idAvailable.pop());
  }
}

function deleteCardID(id) {
  if (id === idCurrent - 1) {
    idCurrent = id;
  }
  else {
    idAvailable.push(id);
  }
}


class User {

  constructor(id, name, mail, avatar) {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.avatar = avatar;
    users[id] = this;
  }

}


class Card extends React.Component {

  constructor(props) {
    super(props);
    this.name = props.name;
    this.column = props.column;
    this.id = props.id;
    this.state = {
      name: props.name,
      tags: props.tags,
      column: props.column,
      assignees: props.assignees,
      taskList: props.taskList,
      description: props.description
    };
  }

  updateState(updated_state) {
    updated_state = Object.assign(this.state, updated_state);
    this.name = updated_state.name
    this.setState(updated_state);
    let cards = board.state.cards;
    cards[this.props.id] = Object.assign(cards[this.props.id], updated_state);
    board.updateState({cards: cards});
  }

  setDescription(description) {
    this.updateState({ description: description });
    try {
      document.getElementById("displayed-card-description").innerText = description
    }
    catch {}
  }

  setTask(i, new_task) {
    let tasks = this.state.taskList;
    tasks[i].task = new_task;
    this.updateState({ taskList: tasks });
  }

  setName(name) {
    if(name === "") {
      name = "Issue #" + this.props.id;
    }
    this.name = name;
    this.updateState({ name: name });
    try {
      document.getElementById("displayed-card-name").innerText = name
    }
    catch {}
  }

  addTag(tag) {
    this.updateState({tags: this.state.tags + [tag] });
  }

  addAssignee(assignee) {
    this.updateState({ assignees: this.state.assignees + [assignee] });
  }

  render() {

    this.name = board.state.cards[this.props.id].name;
    this.state.description = board.state.cards[this.props.id].description;

    let large_tag_count = 0;//this.renderTags();
    let rendered_tags = [];
    let class_name;
    for (let i = 0; i < this.state.tags.length; ++i) {
      if (i < large_tag_count)
        class_name = "tag-hidden tag-large";
      else
        class_name = "tag-hidden tag-small";
      try {
        class_name += " tag-color-" + board.state.tags[this.state.tags[i]].color;
      }
      catch {
        class_name += " tag-color-" + this.state.tags[i];
      }
      rendered_tags.push(<div className={class_name}></div>);
    }

    let task_list_components = [];
    if(this.state.taskList.length > 0) {
      let taskList = this.state.taskList;
      taskList.forEach(task => {
        if(task.done)
        task_list_components = [<li className={"task-done"}/>].concat(task_list_components);
        else
          task_list_components.push(<li className={"task-todo"}/>);
      });
      task_list_components =  <ol className="task-list">
                                <li>{ICON_CHECK}</li>
                                {task_list_components}
                              </ol>;
    }

    return (

      <div className="card" onClick={() => { board.displayCard(this.id); }}>
        <p>{this.name}</p>
        {task_list_components}
        <div>
          {(this.state.description === "" || this.state.description === undefined) ? null : ICON_DESCRIPTION}
          <span>#{board.state.project_id}-{this.props.id}</span>
          {rendered_tags}
        </div>
        {this.state.assignees.length >= 3 ? <img src={users[this.state.assignees[2]].avatar} alt={users[this.state.assignees[2]].name.toString()} style={{ right: '2.75rem' }} /> : null}
        {this.state.assignees.length >= 2 ? <img src={users[this.state.assignees[1]].avatar} alt={users[this.state.assignees[1]].name.toString()} style={{ right: '1.75rem' }} /> : null}
        {this.state.assignees.length >= 1 ? <img src={users[this.state.assignees[0]].avatar} alt={users[this.state.assignees[0]].name.toString()} /> : null}
      </div>

    );
  }

  // Calculate how many tags will be rendered in full length depending on how much space is available
  renderTags() {
    let large_tag_count;
    try {
      let column_width = ReactDOM.findDOMNode(this).clientWidth;
      column_width -= ReactDOM.findDOMNode(this).getElementsByTagName("span")[0].clientWidth; // ID width and margins
      column_width /= FONT_SIZE;
      column_width -= 3.0; // Card margins and padding
      if (this.state.description !== "")
        column_width -= 1.5; // Description icon
      column_width -= 1.25; // Right margin
      if (this.state.assignees.length >= 1)
        column_width -= 2.75; // Assignee avatar
      if (this.state.assignees.length >= 2)
        column_width -= 1.25; // 2nd assignee avatar
      if (this.state.assignees.length >= 3)
        column_width -= 1.0; // 3nd assignee avatar

      large_tag_count = column_width / 3.5;
      let small_tag_count = this.state.tags.length - large_tag_count;
      while (large_tag_count > 0 && large_tag_count * 3.5 + small_tag_count * 1.0 > column_width) {
        large_tag_count--;
        small_tag_count++;
      }
      large_tag_count += 0.75;
    }
    catch (e) {
      large_tag_count = 0;
    }
    return (large_tag_count);
  }

  // On resize, re-calculate how many tags have the space to be fully displayed and tasklist bar width
  resize = () => {
    let large_number = this.renderTags();
    let i = 1;
    while (i <= this.state.tags.length) {
      if (i < large_number + 0.5) {
        ReactDOM.findDOMNode(this).getElementsByClassName("tag-hidden")[i - 1].classList.remove("tag-small");
        ReactDOM.findDOMNode(this).getElementsByClassName("tag-hidden")[i - 1].classList.add("tag-large");
      }
      else {
        ReactDOM.findDOMNode(this).getElementsByClassName("tag-hidden")[i - 1].classList.remove("tag-large");
        ReactDOM.findDOMNode(this).getElementsByClassName("tag-hidden")[i - 1].classList.add("tag-small");
      }
      i++;
    }
    let task_list = ReactDOM.findDOMNode(this).getElementsByClassName("task-list")[0];
    if(task_list !== undefined) {
      task_list.style.marginRight = (this.state.taskList.length > 0 ? 1.75 : 0) + Math.min(3, this.state.assignees.length) * 1.5 + "rem";
    }
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
    // Save the resize function, as it is useful for cases other than actual resize
    board.state.cards[this.props.id].resizeFunction = this.resize;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    if(this.props.id in board.state.cards && !(this.props.id in board.state.archived))
      delete board.state.cards[this.props.id].resizeFunction;
  }

}


class Column extends React.Component {

  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      name: props.name,
      cards: props.cards,
      locked: props.locked,
      description: props.description
    }
  }

  render() {

    return (

      <div className="col-12 col-sm-4 col-lg-2">
        <div className="card-column">
          <div className="header">
            <div className="column-header-name">
              {this.state.locked ? null : ICON_UNLOCKED}
              <h3>{this.state.name}</h3>
            </div>
            <div className="column-header-options">
              <button onClick={() => { board.addCard(this.id, { name: "", description: "", column: this.id, tags: [], assignees: [] }, true); /*this.resize();*/ }}>
                {ICON_PLUS}
              </button>
              {ICON_OPTIONS}
            </div>
          </div>
          <div className="card-list">
            {this.props.children}
            <button className="add-card-button" onClick={() => { board.addCard(this.id, { name: "", description: "", column: this.id, tags: [], assignees: [] }); /*this.resize();*/ }}>
              {ICON_PLUS}
            </button>
          </div>
        </div>
      </div>

    );
  }

  resize = () => {/*
    let card_list = ReactDOM.findDOMNode(this).getElementsByClassName("card-list")[0];
    if (card_list.scrollHeight > card_list.offsetHeight)
        card_list.classList.add("vertically-scrollable");
    else
      card_list.classList.remove("vertically-scrollable");*/
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

}


class Board extends React.Component {

  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      project_id: props.project_id,
      name: props.name,
      cards: props.cards,
      columns: props.columns,
      tags: props.tags,
      users: props.users,
      idCurrent: props.idCurrent,
      idAvailable: props.idAvailable,
      idReuseMode: props.idReuseMode,
      archived: props.archived,
      displayedCard: props.displayedCard,
      dialog: props.dialog
    };
    board = this;
  }

  updateState(updated_state) {
    updated_state = Object.assign(this.state, updated_state);
    this.setState(updated_state);
  }

  getCardID() {
    let id;
    if (!this.state.idReuseMode || this.state.idAvailable.isEmpty()) {
      id = this.state.idCurrent;
      this.state.idCurrent++;
      return (id);
    }
    else {
      return (this.state.idAvailable.pop());
    }
  }

  deleteCardID(id) {
    if (this.state.idReuseMode && id === this.state.idCurrent - 1)
      this.state.idCurrent = id;
    else
      this.state.idAvailable.push(id);
  }

  addCard(column_id, card, first = false) {
    card.id = this.getCardID();
    let cards = this.state.cards;
    let columns = this.state.columns;
    if (first)
      columns[column_id].cards = [card.id].concat(columns[column_id].cards);
    else
      columns[column_id].cards.push(card.id);
    cards[card.id] = card;
    this.updateState({ cards: cards, columns: columns, displayedCard: card.id });
  }

  deleteCard(card_id) {
    if (!(card_id in this.state.cards))
      return;
    let columns = this.state.columns;
    let cards = this.state.cards;
    columns[cards[card_id].column].cards.splice(columns[cards[card_id].column].cards.indexOf(card_id), 1);
    delete cards[card_id];
    this.updateState({ cards: cards, columns: columns, displayedCard: -1 });
    this.deleteCardID(card_id);
  }

  archiveCard(card_id) {
    console.log(this);
    if (!(card_id in this.state.cards))
      return;
    let columns = this.state.columns;
    let cards = this.state.cards;
    let archived = this.state.archived;
    columns[cards[card_id].column].cards.splice(columns[cards[card_id].column].cards.indexOf(card_id), 1);
    archived.push(card_id);
    this.updateState({ cards: cards, columns: columns, displayedCard: -1, archived: archived });
  }

  // If a card is pressed, to open it full-screen we save its ID into board.displayedCard
  displayCard(card_id = -1) { // If a displayed card is closed, we clear the ID from board.displayedCard by putting -1 instead
    this.updateState({ displayedCard: card_id });
  }

  render() {

    let cards = [];
    let columns = [];
    // For each column of cards in the board's list of card IDs
    for (let i = 0; i < this.state.columns.length; ++i) {
      const column_data = this.state.columns[i].cards;
      let column = []; // A list of card components for a column
      // For each card ID in the column
      column_data.forEach(card_id => {
        const card = this.state.cards[card_id];
        column.push( // Add the card's component into the list for a column
          <Card key={card.id.toString()} id={card.id} name={card.name} description={card.description} column={card.column} tags={card.tags} taskList={card.taskList} assignees={card.assignees} />
        );
      });
      // Add the filled column to the main list of components
      cards.push(column);
    }
    // Now generate the column components, complete with their cards as children
    for (let i = 0; i < this.state.columns.length; ++i) {
      const column = this.state.columns[i];
      columns.push(
        <Column key={column.id.toString()} id={column.id} name={column.name} description={column.description} locked={column.locked}>
          {cards[i]}
        </Column>
      );
    }

    // If a card is open full-screen right now, make a component for it
    let displayedCard = null;
    if (this.state.displayedCard !== -1) {
      let card = this.state.cards[this.state.displayedCard];
      displayedCard = <DisplayedCard id={card.id} name={card.name} description={card.description} column={card.column} tags={card.tags} taskList={card.taskList} assignees={card.assignees} />;
    }

    // If a dialog is open full-screen right now, make a component for it
    let dialog = null;
    if (this.state.dialog === "delete-confirmation") {
      dialog =<div className="dialog-container">
                <div id="delete-confirmation" className="dialog">
                  <h2>Are you sure you want to delete this card?</h2>
                  <p>You will not be able to recover it.</p>
                  <input id="do-not-confirm" type="checkbox" name="do-not-confirm" style={{display: "none"}} value="do-not-confirm"/>
                  <label className="checkbox" htmlFor="do-not-confirm">
                    <span><svg viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>
                    <span>Do not ask me again</span>
                  </label> 
                  <div className="actions">
                    <button onClick={() => { board.updateState({dialog: -1});}}>Cancel</button>
                    <div className="delete-buttons">
                      <button onClick={() => { board.updateState({dialog: -1}); board.archiveCard(board.state.displayedCard); preferencies.warnOnDelete = !document.getElementById("do-not-confirm").checked;}}>Archive</button>
                      <button onClick={() => { board.updateState({dialog: -1}); board.deleteCard(board.state.displayedCard); preferencies.warnOnDelete = !document.getElementById("do-not-confirm").checked;}} className="critical">Delete</button>
                    </div>
                  </div>
                </div>
              </div>;
    }

    return (

      <div>
        <div className="row" id="board">
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div className="col-lg-1"></div>
          {columns}
          <div className="col-lg-1"></div>
        </div>
        {displayedCard}
        {dialog}
      </div>

    );
  }

  componentDidMount() {
    shortcut.add("escape", () => {
      if(document.activeElement.contentEditable === "true") {
        return;
      }
      this.displayCard(-1);
    });
    shortcut.add("delete", () => {
      if(document.activeElement.contentEditable === "true")
        return;
      if(preferencies.warnOnDelete)
        board.updateState({dialog: "delete-confirmation"});
      else
        board.deleteCard(this.props.id);
    });
  }

  componentWillUnmount() {
    shortcut.remove("escape");
    shortcut.remove("delete");
  }

}


class DisplayedCard extends Card {

  constructor(props) {
    super(props);
    this.descriptionComponent = React.createRef();
    this.nameComponent = React.createRef();
  };

  removeTask(i) {
    let taskList = this.state.taskList;
    taskList.splice(i, 1);
    this.updateState({taskList: taskList});
    // Remove event listener
    //document.getElementById("task-" + i).removeEventListener("change");
    let cards = board.state.cards;
    cards[this.props.id].taskList = taskList;
    board.updateState({cards: cards});
    for (let j = 0; j < taskList.length; j++) {
      const task = document.getElementById("task-" + j);
      task.checked = taskList[j].done;
    }
    
  }

  removeTag(tag) {
    let tags = this.state.tags;
    tags.splice(this.state.tags.indexOf(tag), 1);
    this.updateState({tags: tags});
    let cards = board.state.cards;
    cards[this.props.id].tags = tags;
    board.updateState({cards: cards});
  }

  removeAssignee(assignee) {
    let assignees = this.state.assignees;
    assignees.splice(this.state.assignees.indexOf(assignee), 1);
    this.updateState({assignees: assignees});
    let cards = board.state.cards;
    cards[this.props.id].assignees = assignees;
    board.updateState({cards: cards});
  }

  editContent(event, exitOnEnter=true) {
    let element = event.target;
    if (event.key === "Escape") {
      // restore state
      document.execCommand("undo");
      element.blur();
    }
    else if (event.key === "Enter" && exitOnEnter) {
      element.blur();
    }
  }

  addDescription() {
    document.getElementById("displayed-card-description").style.display = "inline-block";
    document.getElementById("displayed-card-description").focus();
    document.getElementById("add-description").style.display = "none";
  }

  descriptionSanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "br", "div"],
    allowedAttributes: { a: ["href"] }
  };

  nameSanitizeConf = {
    allowedTags: [],
    allowedAttributes: {}
  };

  render() {

    let taskList = []
    for (let i = 0; i < this.state.taskList.length; i++) {
      const task = this.state.taskList[i];
      taskList.push(
        <li className="displayed-task">
          <input id={"task-" + i} type="checkbox" name={"task-" + i} style={{display: "none"}} value={"task-" + i} defaultChecked={task.done}/>
          <label className="checkbox checkbox-small crossed" htmlFor={"task-" + i}>
            <span><svg viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg></span>
            <span id={"task-text-" + i}
                  onBlur={ () => { 
                    let elem = document.getElementById("task-text-" + i);
                    let new_task = elem.innerText;
                    if(new_task === "") {
                      document.execCommand("undo");
                      elem.blur();
                    }
                    else
                      this.setTask(i, new_task);
                    elem.contentEditable = false; }}
                  onKeyDown={e => { this.editContent(e); }}>
              {task.task}
            </span>
          </label>
          <button className="edit-task" onClick={() => { document.getElementById("task-text-" + i).contentEditable = true; document.getElementById("task-text-" + i).focus() }}>
            {ICON_EDIT}
          </button>
          <button className="remove-task" onClick={() => { this.removeTask(i); }}>
            <svg viewBox="0 0 64 64" stroke="currentColor" fill="currentColor"><line x1="18" y1="32" x2="46" y2="32" /></svg>
          </button>
        </li>
      );
    }
    taskList.push(
      <button id="add-task">
        {ICON_PLUS}<span>Add</span>
      </button>
    );

    let tags = []
    this.state.tags.forEach(tag => {
      try {
        tags.push(
          <span className={`tag-color-${board.state.tags[tag].color}`}>
            {board.state.tags[tag].name}
            <button className="remove-card-tag" onClick={() => { this.removeTag(tag); }}>
              <svg viewBox="0 0 64 64" stroke="currentColor" fill="currentColor"><line x1="18" y1="32" x2="46" y2="32" /></svg>
            </button>
          </span>
        );
      }
      catch (e) {
        console.log(board.state.tags[tag]);
      }
    });
    tags.push(<button id="add-tag">{ICON_ADD_TAG}</button>);

    let assignees = []
    this.state.assignees.forEach(assignee => {
      assignees.push(
        <li className="displayed-assignee">
          <div>
            <img src={users[assignee].avatar} alt={users[assignee].name.toString()} />
            <button className="remove-card-assignee" onClick={() => { this.removeAssignee(assignee); }}>
              <svg viewBox="0 0 64 64" stroke="currentColor" fill="currentColor"><line x1="18" y1="32" x2="46" y2="32" /></svg>
            </button>
            <span>{users[assignee].name}</span>
          </div>
        </li>
      );
    });
    assignees.push(
      <li>
        <button id="add-assignee">
          {ICON_ADD_USER}
          <span>Assign</span>
        </button>
      </li>
    );

    let description;
    let add_btn_style = {}
    let desc_style = {}
    if (this.state.description !== "")
      add_btn_style = {"display": "none"};
    else
      desc_style = {"display": "none"};
    description = <div className="displayed-card-section displayed-card-description">
                    <div className="displayed-card-section-name">
                      {ICON_DESCRIPTION}<span>Description</span>
                    </div>
                    <ContentEditable
                      id="displayed-card-description"
                      innerRef={this.descriptionComponent}
                      html={this.state.description} // innerHTML of the editable div
                      disabled={false}
                      onKeyDown={event => { this.editContent(event, false); }}
                      onBlur={event => {
                        this.setDescription(sanitizeHtml(event.target.innerHTML, this.descriptionSanitizeConf));
                        if(event.target.innerText === '') {
                          event.target.style.display = "none";
                          document.getElementById("add-description").style.display = "flex";
                        }}}
                      tagName='p' // Use a custom HTML tag (uses a div by default)
                      style={desc_style}
                    />
                    <button id="add-description" 
                            onClick={ () => { this.addDescription(); }}
                            style={add_btn_style}>
                      {ICON_PLUS}<span>Add</span>
                    </button>
                  </div>;

    return (

      <div className="displayed-card-background" onClick={() => { board.displayCard(-1); }}>
        <div className="displayed-card-container">
          <div className="displayed-card" onClick={(e) => { let evt = e ? e : window.event; if (evt.stopPropagation) { evt.stopPropagation(); } else { evt.cancelBubble = true; } return false; /* Ignore click - to prevent clicks from registering on lower layers */ }}>
            <div className="displayed-card-header">
              <ContentEditable
                id="displayed-card-name"
                innerRef={this.nameComponent}
                disabled={false}
                onBlur={ () => { 
                  this.setName(document.getElementById("displayed-card-name").innerText); 
                }} 
                tagName='h2'
                onKeyDown={e => { this.editContent(e); }}
                html={this.state.name}
              />
              <div>
                <span>in </span><span className="displayed-card-column">{board.state.columns[this.state.column].name}</span>{ICON_DROPDOWN_ARROW}
              </div>
            </div>
            {description}
            <div className="displayed-card-details">
              <div className="displayed-card-section displayed-card-task-list">
                <div className="displayed-card-section-name">
                  {ICON_CHECK}<span>Task list</span>
                </div>
                <ol>
                  {taskList}
                </ol>
              </div>
              <div className="displayed-card-section displayed-card-tags">
                <div className="displayed-card-section-name">
                  {ICON_TAG}<span>Tags</span>
                </div>
                <div className="displayed-card-tag-list">{tags}</div>
              </div>
              <div className="displayed-card-section displayed-card-assignees">
                <div className="displayed-card-section-name">
                  {ICON_ASSIGNEES}<span>Assignees</span>
                </div>
                <ul>{assignees}</ul>
              </div>
              <div className="displayed-card-section displayed-card-files" style={{ display: "none" }}>
                <div className="displayed-card-section-name">
                  {ICON_ATTACH}<span>Files</span>
                </div>
                <button id="add-files">
                  {ICON_PLUS}<span>Attach</span>
                </button>
              </div>
              <div className="displayed-card-section displayed-card-due-date">
                <div className="displayed-card-section-name">
                  {ICON_SCHEDULLE}<span>Due date</span>
                </div>
                <button id="add-due-date">
                  {ICON_CALENDAR}<span>Select</span>
                </button>
              </div>
            </div>
            <div className="displayed-card-options">
              <button id="move-card-button">
                {ICON_ARROW_RIGHT}<span>Move</span>
              </button>
              <button id="duplicate-card-button">
                {ICON_DUPLICATE}<span>Duplicate</span>
              </button>
              <button id="save-template-card-button" style={{display: "none"}}>
                {ICON_SAVE_TEMPLATE}<span>Save template</span>
              </button>
              <div className="divider" style={{display: "none"}}/>
              <button id="subscribe-card-button" style={{display: "none"}}>
                {ICON_SUBSCRIBE}<span>Subscribe</span>
              </button>
              <button id="star-card-button" style={{display: "none"}}>
                {ICON_STAR}<span>Star</span>
              </button>
              <button id="link-card-button">
                {ICON_LINK}<span>Copy link</span>
              </button>
              <button id="forward-card-button" style={{display: "none"}}>
                {ICON_FORWARD}<span>Forward</span>
              </button>
              <div className="divider" />
              <button id="archive-card-button" onClick={() => { board.archiveCard(this.props.id); }}>
                {ICON_ARCHIVE}<span>Archive</span>
              </button>
              <button id="delete-card-button" className="critical-on-hover" 
                      onClick={() => { if(preferencies.warnOnDelete) {board.updateState({dialog: "delete-confirmation"});} else {board.deleteCard(this.props.id);} }}>
                {ICON_TRASH}<span>Delete</span>
              </button>
            </div>
            <div className="displayed-card-footer">
              <div className="displayed-card-created">
                <img src={users[this.props.creator].avatar} alt={users[this.props.creator].name.toString()} style={{ right: '2.75rem' }} />
                <span className="displayed-card-creator">
                  {users[this.props.creator].name} <span>created this card on</span><span className="number"> {this.props.creation_date}</span>
                </span>
              </div>
              <div className="displayed-card-id number">
                #{board.state.project_id}-{this.props.id}
              </div>
            </div>
          </div>
          <div className="displayed-card-right-buttons" onClick={e => { let evt = e ? e : window.event; if (evt.stopPropagation) { evt.stopPropagation(); } else { evt.cancelBubble = true; } return false; /* Ignore click - to prevent clicks from registering on lower layers */ }}>
            <div className="displayed-card-right-top-buttons">
              <button onClick={() => { board.displayCard(-1); }}>{ICON_CROSS}</button>
              <button>{ICON_INFO}</button>
              <button>{ICON_SHARE}</button>
            </div>
            <div className="displayed-card-right-bottom-buttons">
              <button>{ICON_COPY}</button>
              <button className="critical-on-hover" onClick={() => { if(preferencies.warnOnDelete) {board.updateState({dialog: "delete-confirmation"});} else {board.deleteCard(this.props.id);} }}>{ICON_BIN}</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

  componentDidMount() {
    // Add event listeners to the tasklist checkboxes
    for (let i = 0; i < this.state.taskList.length; i++) {
      document.getElementById("task-" + i).addEventListener("change", evt => {
        let checkbox = evt.target;
        let task_list = this.state.taskList;
        task_list[i].done = checkbox.checked;
        this.updateState({taskList: task_list});
        board.state.cards[this.props.id].taskList = task_list;
      });
    }
    // If this is a new card, focus on the name input
    if(this.state.name === "") {
      document.getElementById("displayed-card-name").focus();
    }
  }

  // If some of the properties of the card have been changed, we have to re-render it on the board.
  // To do this, we'll simulate a resize, unless the card has been deleted.
  componentWillUnmount() {
    try {
      if(this.props.id in board.state.cards && !(this.props.id in board.state.archived)) {
        board.state.cards[this.props.id].resizeFunction();
      }
    }
    catch {}
    document.activeElement.blur();
  }

  resize = () => {}
}

Card.defaultProps = {
  tags: [],
  name: '',
  creator: 1,
  assignees: [1, 2],
  taskList: [],
  description: '',
  creation_date: "11.10.2020"
};

Column.defaultProps = {
  locked: true,
  description: '',
  cards: {}
};

Board.defaultProps = {
  cards: [],
  columns: [],
  users: {},
  tags: {},
  archived: [],
  displayedCard: -1,
  dialog: -1,
  idCurrent: 1,
  idReuseMode: false,
  idAvailable: new BinaryHeap()
};

new User(1, "John Galt", "whoisjgalt@mail.com", "../static/imgs/avatar_ba@2x.png");
new User(2, "Amy House", "amywhoexactly@mail.com", "../static/imgs/avatar_cj@2x.png");
new User(3, "Michael", "mychael@mail.com", "../static/imgs/avatar_cx@2x.png");
new User(4, "Alice Boering", "nonotboring@mail.com", "../static/imgs/avatar_bz@2x.png");

idAvailable = new BinaryHeap();
idCurrent = 1;

let tags = {
  0: { "name": "performance", "color": 0 },
  1: { "name": "feature",     "color": 1 },
  2: { "name": "csharp",      "color": 2 },
  3: { "name": "critical",    "color": 3 },
  4: { "name": "python",      "color": 4 },
  5: { "name": "installer",   "color": 5 },
  6: { "name": "xs queries",  "color": 6 },
  7: { "name": "lrm",         "color": 7 },
  8: { "name": "ipsm",        "color": 8 }
}
board.state = { tags: tags };

let columns_json = [
  {
    id: 0,
    name: "Reported",
    locked: false,
    cards: []
  },
  {
    id: 1,
    name: "Confirmed",
    locked: true,
    cards: []
  },
  {
    id: 2,
    name: "In development",
    locked: true,
    cards: []
  },
  {
    id: 3,
    name: "Testing",
    locked: true,
    cards: []
  },
  {
    id: 4,
    name: "Finished",
    locked: true,
    cards: []
  }
];

let id = getCardID();
let cards_json = {};
cards_json[id] = {
  id: id,
  name: "Call a function from its name/id in order to allow arrays of functions.",
  description: "Add an option to call functions from its name/id for more flexibility, specifically to make lists of functions. Alternatively make some kind of function object.",
  column: 0,
  tags: [0, 1, 6],
  taskList: [{task: "Call function from ID", done: true}, {task: "Call function by name", done: false}, {task: "Make a function object", done: false}, {task: "Test calling a function", done: false}, {task: "Log function calls", done: false}],
  assignees: [1, 3]
};
columns_json[0].cards.push(id);
let texts = ["Vivamus vel risus sed metus ultricies sollicitudin sed in lectus.", "Donec vitae augue vel ligula iaculis pharetra eu eu nunc.", "Curabitur accumsan sem eget tortor mollis, consequat aliquet justo faucibus.", "Cras nec diam euismod, fermentum lectus ut, suscipit tortor.", "Maecenas a metus vitae urna dictum eleifend.", "Curabitur elementum leo ut mattis tristique.", "Morbi auctor tellus et dapibus pretium.", "Vestibulum sagittis lacus sed feugiat commodo.", "Cras pharetra libero at metus feugiat placerat.", "Nullam vitae tellus semper sem dignissim pharetra.", "Mauris ac velit at nibh tempor volutpat vitae et nunc.", "Ut vitae mauris non nulla vehicula pretium.", "Nullam ut dolor sollicitudin sapien dignissim ultricies.", "Sed scelerisque tellus ut pulvinar iaculis.", "Vivamus commodo risus vel ipsum pulvinar, quis dictum tortor elementum.", "Quisque ac quam placerat, ultricies ipsum non, posuere dui.", "Cras ut quam nec enim finibus pretium.", "Morbi pulvinar eros et tortor pharetra molestie.", "Curabitur rutrum libero ac enim pellentesque blandit.", "Quisque varius nisl eget lectus feugiat rhoncus.", "Fusce dapibus nulla nec odio ornare porttitor.", "Phasellus eget nibh at libero mattis condimentum ut quis mauris.", "Donec cursus dui et massa dapibus consectetur.", "Morbi vel lorem porta, venenatis sem vehicula, tempor metus.", "Integer quis mi vel nisi posuere imperdiet.", "Curabitur rutrum odio id urna molestie, nec commodo metus blandit.", "Phasellus gravida massa quis sem posuere, id luctus ipsum venenatis.", "Morbi sed arcu imperdiet, feugiat velit ac, cursus mi.", "Donec id magna sit amet urna tempor sodales.", "Nullam tempor mi a ex sagittis volutpat.", "Integer nec diam ultrices orci vestibulum ullamcorper id in erat.", "Donec molestie lacus a scelerisque fringilla.", "Maecenas eu est aliquam justo aliquet tempor.", "Quisque dictum metus tempor, commodo quam in, molestie risus.", "Phasellus condimentum eros vitae eros ultricies tristique.", "Donec sed purus sit amet mauris eleifend consequat.", "Phasellus tempor libero sed ornare consequat.", "Phasellus ultricies augue ut enim sodales, sed dapibus lorem tempus.", "Curabitur eu nibh congue, tincidunt odio in, dictum elit.", "Donec tempus velit a pretium sagittis.", "Nullam ut mauris vehicula, facilisis sapien eu, finibus lectus.", "Vestibulum quis tellus eu orci posuere eleifend sit amet non lectus.", "Donec egestas augue in orci condimentum porta.", "Donec et lacus ac sapien accumsan rhoncus.", "Sed dictum nisi a tempus hendrerit.", "Donec porttitor ante quis lacus pretium congue.", "Nulla nec risus vel velit lobortis dapibus.", "Pellentesque quis felis vitae eros molestie rutrum.", "Etiam molestie dolor placerat, semper dolor non, volutpat erat.", "Sed ac nisl ullamcorper quam maximus blandit.", "Nullam sed nisl malesuada, lacinia lacus sed, porttitor eros.", "Aliquam porttitor lacus vel ornare pellentesque.", "Curabitur vitae nunc ullamcorper, ultricies dolor at, rutrum odio.", "Morbi a lacus a nibh gravida hendrerit.", "Curabitur dapibus ligula molestie ante tristique, in tincidunt purus porttitor.", "Fusce sed mi vel nunc mollis scelerisque quis ac massa.", "Suspendisse rhoncus sem non fringilla finibus.", "Praesent sagittis odio eget fringilla ornare.", "Morbi hendrerit nisl varius, egestas nulla eu, gravida urna.", "Vestibulum eget odio ac enim rutrum sollicitudin in eget turpis.", "Aliquam facilisis neque venenatis dui pulvinar feugiat.", "Proin iaculis metus non urna hendrerit vestibulum.", "Donec eu nisi vel risus aliquam maximus.", "Morbi convallis lorem id nibh tincidunt, vitae ultrices tortor malesuada.", "Vestibulum sollicitudin nunc vel tincidunt consectetur.", "Pellentesque vestibulum augue non cursus mattis.", "Nunc vestibulum arcu aliquet, eleifend nisi ac, condimentum nisl.", "Phasellus pulvinar tortor hendrerit pellentesque faucibus.", "Integer feugiat erat id libero dictum tincidunt.", "Nulla pharetra turpis a mollis cursus.", "Duis et justo efficitur, malesuada turpis eu, tempus nulla.", "Aliquam lobortis risus eu velit sagittis maximus.", "Vestibulum nec est pharetra, rhoncus turpis eget, pretium tellus.", "Morbi iaculis mi a ligula pharetra, nec venenatis augue porttitor.", "Duis et sem eu dolor suscipit sollicitudin eget at massa.", "Donec tempus urna nec mauris tristique, in sollicitudin lacus egestas.", "Praesent fermentum odio et nisl auctor laoreet.", "Cras mattis diam venenatis, elementum risus non, porta nisl.", "Fusce molestie turpis eget ultricies dictum.", "Aliquam efficitur libero vel luctus elementum.", "Quisque non arcu nec justo vestibulum laoreet a sed nunc.", "Sed laoreet mi in nisl cursus fringilla.", "Duis finibus lectus non condimentum pretium.", "Nunc a arcu hendrerit, vestibulum leo quis, condimentum nisi.", "Phasellus vitae risus auctor, maximus purus in, blandit ligula.", "Curabitur pretium est vel mauris pharetra maximus.", "Morbi nec lectus nec felis vestibulum hendrerit at id orci.", "Quisque id orci sit amet est convallis egestas.", "Praesent laoreet odio tincidunt urna condimentum tincidunt.", "Fusce tristique erat vitae tortor malesuada, ac aliquam turpis euismod.", "Ut vel quam auctor, convallis leo non, finibus est.", "Praesent vitae justo at diam iaculis venenatis.", "Donec fermentum tortor id mauris fringilla, faucibus tristique metus placerat.", "Proin sit amet tortor vitae purus bibendum mattis eu eget est.", "Sed mollis leo sit amet ex vestibulum, nec faucibus felis mattis.", "Vivamus lobortis odio at ipsum scelerisque, ac tristique sem molestie.", "Donec ornare magna vel lacus lacinia, nec mattis nisi elementum.", "Pellentesque faucibus mauris sed justo ultrices, at convallis odio efficitur.", "Sed id erat non nulla ullamcorper aliquet.", "Integer nec sem eu velit ullamcorper sollicitudin sed quis nunc.", "Vivamus et metus iaculis, fringilla nunc vel, dapibus turpis.", "Donec euismod nibh eu nisi efficitur, eget tempus elit eleifend.", "Mauris pharetra diam at orci euismod, vel elementum felis molestie.", "Donec viverra tortor quis arcu lacinia, et sodales erat viverra.", "Phasellus efficitur sem nec ullamcorper semper.", "Maecenas vel urna quis risus facilisis tincidunt.", "Proin eu mi ut ante tristique lacinia et ac elit.", "Mauris euismod magna ut efficitur maximus.", "Maecenas consectetur elit vitae nulla dignissim, eget posuere sem convallis.", "Curabitur tincidunt est vitae velit egestas, ac placerat dui consequat.", "Pellentesque consequat arcu dignissim arcu interdum gravida at vitae eros.", "Maecenas quis orci consectetur, tincidunt dui ac, euismod libero.", "Sed consectetur magna sed turpis pharetra, ac cursus tortor egestas.", "Nam in mauris nec arcu vulputate ornare.", "Morbi a leo eleifend, bibendum ipsum vitae, faucibus eros.", "Vivamus eget justo sit amet urna dictum euismod.", "Mauris sagittis orci et rhoncus dictum.", "Cras a ex eleifend, sollicitudin libero quis, pretium dolor.", "Nullam tristique orci id varius vestibulum.", "Donec non quam eu eros lobortis aliquam.", "Ut ultrices lacus vel imperdiet semper.", "Quisque a diam id turpis faucibus interdum.", "Morbi luctus lectus sed scelerisque volutpat.", "Nunc a lectus sed dolor molestie blandit.", "Vestibulum dignissim arcu quis tempor dapibus.", "In convallis quam ac lorem elementum, vitae molestie nibh mattis.", "Fusce laoreet tortor eu augue interdum laoreet.", "Pellentesque non mi id sem tempus mattis eu eu purus.", "Vestibulum ornare erat sed vehicula lacinia.", "In pulvinar ligula rutrum, sollicitudin lorem ultrices, varius dui.", "Curabitur sit amet sem a elit sodales dignissim.", "Vivamus bibendum leo ac vehicula pharetra.", "Cras a arcu id nisl sagittis varius.", "Maecenas faucibus tortor nec lacinia laoreet.", "Donec sit amet nulla vel enim malesuada aliquam.", "Phasellus in nibh tincidunt, gravida erat eget, sollicitudin purus.", "Suspendisse eu est sed leo iaculis accumsan.", "Nam mollis urna vitae tempus porttitor.", "Donec eu mauris at lacus dictum dictum sit amet quis lectus.", "Cras a orci sit amet massa gravida pharetra eu tempus arcu.", "Curabitur quis nisl ac leo pharetra pulvinar et id enim.", "Suspendisse tempus purus nec vestibulum feugiat.", "Sed ullamcorper tortor placerat tellus ullamcorper ultrices.", "Quisque eget massa efficitur, ullamcorper augue sed, cursus mi.", "Suspendisse nec quam in tellus rutrum tincidunt at sit amet urna.", "Vivamus faucibus augue sit amet cursus efficitur.", "Maecenas auctor eros vel molestie malesuada.", "Maecenas at mauris consequat, molestie nulla sed, tempor elit.", "Etiam ut quam id lorem finibus ullamcorper.", "In pretium nisi eget tellus varius elementum.", "Morbi tempus leo vel pretium hendrerit.", "Donec vitae nibh a leo facilisis aliquam id in risus.", "Vestibulum interdum ipsum sed rutrum facilisis.", "Duis lacinia mi in cursus sagittis.", "Vivamus vitae urna ullamcorper, gravida eros et, suscipit arcu.", "Fusce efficitur elit eget erat auctor vehicula.", "Fusce blandit ipsum in arcu lacinia, venenatis volutpat dolor porttitor.", "Sed aliquam eros sit amet dolor laoreet tempus.", "Proin sagittis quam non leo convallis, vitae aliquet massa commodo.", "Praesent vulputate risus eget metus accumsan efficitur.", "Cras luctus dolor non tincidunt congue.", "Nam vulputate est et tortor finibus, ut imperdiet arcu viverra.", "Integer in erat malesuada, dapibus ante sed, convallis nibh.", "Pellentesque in est ut tellus ultricies imperdiet in viverra sapien.", "Pellentesque lobortis elit sed sapien auctor, eu hendrerit nunc feugiat.", "Suspendisse at nisl vulputate, gravida nisi in, vehicula odio.", "Quisque dictum justo rutrum felis imperdiet mollis.", "Sed vestibulum ligula vitae ipsum imperdiet, sit amet sollicitudin justo convallis.", "Duis quis quam mollis, eleifend odio in, pretium velit.", "In ultricies ante vitae urna porta vehicula.", "Fusce rutrum neque in metus vulputate varius.", "Morbi vel purus a nisl venenatis blandit.", "Aliquam luctus tellus nec malesuada laoreet.", "Sed ut libero vitae risus viverra iaculis non non quam.", "Vivamus faucibus dui eu est placerat lacinia a in nisi.", "Quisque ornare nunc in leo vulputate, eget facilisis ligula aliquet.", "Nunc semper tellus pellentesque, suscipit metus vel, convallis lorem.", "In lacinia est eget imperdiet dapibus.", "Donec sagittis lacus vel ligula consequat, nec finibus velit aliquam.", "Nulla suscipit est eu ultricies ullamcorper.", "Pellentesque bibendum enim at diam egestas aliquam.", "Sed ac mauris nec mauris commodo varius.", "Aliquam ornare ipsum pellentesque neque ultricies euismod.", "Fusce dapibus tellus vel justo gravida fringilla.", "In ac lorem sed sapien faucibus pulvinar.", "Vestibulum facilisis ante feugiat neque pharetra porttitor."];



for (let i = 0; i < 30; ++i) {
  let random_int = getRandomInt(texts.length - 1);
  let name = texts[random_int];
  let column = getRandomInt(columns_json.length);
  let id = getCardID();
  let tags = [];
  let task_list = [];
  let assignees = [];
  let description = "";
  texts.splice(random_int, 1);
  if (Math.random() > 0.3) {
    random_int = getRandomInt(texts.length - 1);
    if (Math.random() > 0.7)
      description = name + '\n' + texts.splice(random_int, 1);
    else
      description = texts.splice(random_int, 1);
  }
  if (Math.random() < 0.1) {
    for (let j = 0; j < 2 + getRandomInt(7); ++j) {
      random_int = getRandomInt(texts.length - 1);
      let task = {task: texts.splice(random_int, 1)}
      if (Math.random() < 0.2 + column / 6.0)
        task.done = true;
      task_list.push(task);
    }
  }
  for (let j = 0; j < getRandomInt(4) * getRandomInt(3) + getRandomInt(4); ++j) {
    let tag = getRandomInt(8);
    if (tags.indexOf(tag) === -1)
      tags.push(tag);
  }
  for (let j = 0; j < getRandomInt(4); ++j) {
    let assignee = getRandomInt(4) + 1;
    if (assignees.indexOf(assignee) === -1)
      assignees.push(assignee);
  }
  cards_json[id] = {
    id: id,
    name: name,
    description: description,
    column: column,
    tags: tags,
    taskList: task_list,
    assignees: assignees
  };
  columns_json[column].cards.push(id);
}

console.log(cards_json);
console.log(columns_json);

var boardContainer =
  <Board id={0} project_id={'UHC'} name={"UHC Bugs"} tags={tags} columns={columns_json} cards={cards_json} idAvailable={idAvailable} idCurrent={idCurrent} />;

ReactDOM.render(
  boardContainer,
  document.getElementsByTagName('body')[0]
);

document.getElementsByTagName("body")[0].className = "theme-" + preferencies.theme;
