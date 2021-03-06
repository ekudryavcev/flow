import React from 'react';



const ICON_DESCRIPTION = 
    <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none">
        <line x1="0" y1="8" x2="64" y2="8" />
        <line x1="0" y1="32" x2="64" y2="32" />
        <line x1="0" y1="56" x2="48" y2="56" />
    </svg>;

const ICON_PLUS = 
    <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none">
        <line x1="32" y1="7" x2="32" y2="57" />
        <line x1="7" y1="32" x2="57" y2="32" />
    </svg>;

const ICON_UNLOCKED = 
    <svg viewBox="0 0 64 64" strokeWidth="6" stroke="currentColor" fill="none">
        <circle cx="32" cy="32" r="24.86" />
        <path d="M32,6.84A34.09,34.09,0,0,1,43.66,32.31c0,16.19-7.28,21-11.66,24.24" />
        <path d="M32,6.84A34.09,34.09,0,0,0,20.31,32.31c0,16.19,7.28,21,11.66,24.24" />
        <line x1="10.37" y1="19.75" x2="53.75" y2="19.75" />
        <line x1="32" y1="6.84" x2="32" y2="56.55" />
        <line x1="11.05" y1="45.33" x2="52.98" y2="45.33" />
        <line x1="7.14" y1="32.31" x2="56.86" y2="31.69" />
    </svg>;

const ICON_OPTIONS = 
    <svg style={{ width: '0.15rem' }} viewBox="28 0 8 64" strokeWidth="6" stroke="currentColor"
        fill="none">
        <line x1="28" y1="8" x2="36" y2="8" />
        <line x1="28" y1="32" x2="36" y2="32" />
        <line x1="28" y1="56" x2="36" y2="56" />
    </svg>;

const ICON_DROPDOWN_ARROW = 
    <svg strokeWidth="8" viewBox="0 0 13.409 8.091">
        <g transform="translate(0.688 0.726)">
            <path d="M6.53,18.86l6.279,5.956L18.53,18.86" transform="translate(-6.53 -18.86)" fill="none"
                stroke="currentColor" strokeWidth="2" />
        </g>
    </svg>;

const ICON_CHECK = 
    <svg strokeWidth="6" viewBox="0 0 17.75 17.75">
        <g transform="translate(0.875 0.875)">
            <circle cx="8" cy="8" r="8" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <path d="M15.79,24.834l3.488,2.637,6.163-8.651" transform="translate(-12.916 -14.988)" fill="none"
                stroke="currentColor" strokeWidth="1.75" />
        </g>
    </svg>;

const ICON_CALENDAR = 
    <svg viewBox="-1 -1 18 19.785">
        <g transform="translate(0 1.785)" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="16" height="16" rx="1.75" stroke="currentColor" strokeWidth="1.75" />
            <rect x="0.875" y="0.875" width="14.25" height="14.25" rx="0.875" fill="none" />
        </g>
        <line x2="16" transform="translate(0 5.712)" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <line y1="2.427" transform="translate(3.609)" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <line y1="2.427" transform="translate(12.162)" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <g transform="translate(3.188 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="2.195" height="2.195" stroke="none" />
            <rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" />
        </g>
        <g transform="translate(6.853 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="2.195" height="2.195" stroke="none" />
            <rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" />
        </g>
        <g transform="translate(10.472 8.328)" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="2.195" height="2.195" stroke="none" />
            <rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" />
        </g>
        <g transform="translate(3.252 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="2.195" height="2.195" stroke="none" />
            <rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" />
        </g>
        <g transform="translate(6.92 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="2.195" height="2.195" stroke="none" />
            <rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" />
        </g>
        <g transform="translate(10.538 12.527)" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect width="2.195" height="2.195" stroke="none" />
            <rect x="0.875" y="0.875" width="0.445" height="0.445" fill="none" />
        </g>
    </svg>;

const ICON_SCHEDULLE = 
    <svg strokeWidth="6" viewBox="0 0 17.5 18.105">
        <g transform="translate(0.75 0.75)">
            <path
                d="M15.8,23.609H7.127a.78.78,0,0,1-.777-.764V10.407a.777.777,0,0,1,.777-.777H19.552a.777.777,0,0,1,.777.777v6.986"
                transform="translate(-6.35 -8.071)" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeWidth="1.5" />
            <line x2="13.979" transform="translate(0 4.99)" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeWidth="1.5" />
            <line y1="1.559" transform="translate(3.153)" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeWidth="1.5" />
            <line y1="1.559" transform="translate(10.626)" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeWidth="1.5" />
            <circle cx="3.877" cy="3.877" r="3.877" transform="translate(8.246 8.851)" fill="none" stroke="currentColor"
                strokeLinecap="round" strokeWidth="1.5" />
            <path d="M45.22,36.7v2.844l1.357,1.042" transform="translate(-33.097 -26.698)" fill="none" stroke="currentColor"
                strokeLinecap="round" strokeWidth="1.5" />
        </g>
    </svg>;

const ICON_TAG = 
    <svg strokeWidth="6" viewBox="0 0 19.5 19.345">
        <g transform="translate(1.75 1.75)">
            <g transform="translate(-7.42 -7.85)" fill="none" strokeLinecap="square">
                <path
                    d="M7.42,14.558V8.165a.315.315,0,0,1,.315-.315h7.122a.331.331,0,0,1,.224.091l8.244,8.247a.315.315,0,0,1,0,.451L15.973,23.6a.315.315,0,0,1-.451,0L7.5,14.773A.337.337,0,0,1,7.42,14.558Z"
                    stroke="none" />
                <path
                    d="M 7.735389709472656 7.850000381469727 C 7.561208724975586 7.850000381469727 7.420000076293945 7.991209030151367 7.420000076293945 8.165390014648438 L 7.420000076293945 14.55834007263184 C 7.421428680419922 14.63722038269043 7.450439453125 14.71310043334961 7.501998901367188 14.7728099822998 L 15.52236938476563 23.60055923461914 C 15.58169937133789 23.6612491607666 15.66299915313721 23.69545936584473 15.74786949157715 23.69545936584473 C 15.83273887634277 23.69545936584473 15.91402912139893 23.6612491607666 15.97336959838867 23.60055923461914 L 23.32510948181152 16.6399097442627 C 23.38578796386719 16.58057975769043 23.41999816894531 16.4992790222168 23.41999816894531 16.41440963745117 C 23.41999816894531 16.32952880859375 23.38578796386719 16.24823951721191 23.32510948181152 16.18890953063965 L 15.08081912994385 7.941459655761719 C 15.02037906646729 7.883829116821289 14.94039916992188 7.851160049438477 14.85688877105713 7.850000381469727 L 7.735389709472656 7.850000381469727 M 7.735389709472656 6.100000381469727 L 14.85688877105713 6.100000381469727 L 14.86903953552246 6.100000381469727 L 14.88119888305664 6.100170135498047 C 15.407639503479 6.107479095458984 15.90741920471191 6.311599731445313 16.28845977783203 6.674930572509766 L 16.30365943908691 6.689420700073242 L 16.31848907470703 6.704259872436523 L 24.55835151672363 14.94728088378906 C 24.94723701477051 15.33273124694824 25.16999816894531 15.8666353225708 25.16999816894531 16.41440963745117 C 25.16999816894531 16.96677017211914 24.94348907470703 17.50502967834473 24.54854965209961 17.89118957519531 L 24.53849983215332 17.90102005004883 L 24.52827835083008 17.91069030761719 L 17.18978881835938 24.85879516601563 C 16.80645179748535 25.23223876953125 16.2838020324707 25.44545936584473 15.74786949157715 25.44545936584473 C 15.19544887542725 25.44545936584473 14.65714836120605 25.21891021728516 14.27098846435547 24.82390022277832 L 14.24862861633301 24.8010196685791 L 14.22711944580078 24.7773494720459 L 6.206748962402344 15.94960021972656 L 6.191898345947266 15.93325996398926 L 6.177469253540039 15.91654968261719 C 5.85923957824707 15.54800033569336 5.679109573364258 15.07691955566406 5.670289993286133 14.59005928039551 L 5.670000076293945 14.57419967651367 L 5.670000076293945 14.55834007263184 L 5.670000076293945 8.165390014648438 C 5.670000076293945 7.026529312133789 6.596529006958008 6.100000381469727 7.735389709472656 6.100000381469727 Z"
                    stroke="none" fill="currentColor" />
            </g>
            <g transform="translate(2.801 2.575)" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeWidth="1.75">
                <circle cx="1.224" cy="1.224" r="1.224" stroke="none" />
                <circle cx="1.224" cy="1.224" r="2.099" fill="none" />
            </g>
        </g>
    </svg>;

const ICON_ADD_TAG = 
    <svg strokeWidth="6" viewBox="0 0 28 28">
        <g transform="translate(2 2)">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="24" height="24" stroke="none" />
                <rect x="-1" y="-1" width="26" height="26" fill="none" />
            </g>
            <g transform="translate(4 4)">
                <line y2="16" transform="translate(8)" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x2="16" transform="translate(0 8)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>
        </g>
    </svg>;

const ICON_ASSIGNEES = 
    <svg strokeWidth="6" viewBox="0 0 19.5 14.363">
        <g transform="translate(0.75 0.75)">
            <circle cx="2.77" cy="2.77" r="2.77" transform="translate(2.851)" fill="none" stroke="currentColor"
                strokeLinecap="square" strokeWidth="1.5" />
            <path d="M18.8,40.345A5.605,5.605,0,0,0,13.2,34.74h0A5.605,5.605,0,0,0,7.59,40.345Z"
                transform="translate(-7.59 -27.482)" fill="none" stroke="currentColor" strokeLinecap="square"
                strokeWidth="1.5" />
            <circle cx="2.231" cy="2.231" r="2.231" transform="translate(11.244 2.253)" fill="none" stroke="currentColor"
                strokeLinecap="square" strokeWidth="1.5" />
            <path d="M38.38,42.214h6.645A4.514,4.514,0,0,0,40.5,37.7h0a5.375,5.375,0,0,0-2.307.623"
                transform="translate(-27.025 -29.351)" fill="none" stroke="currentColor" strokeLinecap="square"
                strokeWidth="1.5" />
        </g>
    </svg>;

const ICON_ADD_USER = 
    <svg strokeWidth="6" viewBox="0 0 36 36">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="18" cy="18" r="18" stroke="none" />
            <circle cx="18" cy="18" r="17" fill="none" />
        </g>
        <g transform="translate(10 10)">
            <line y2="16" transform="translate(8)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x2="16" transform="translate(0 8)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>
    </svg>;

const ICON_ARROW_RIGHT = 
    <svg viewBox="0 0 19.41 15.149">
        <g transform="translate(0 0.688)">
            <line x1="18" transform="translate(0 7.129)" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <path d="M38.55,14.63l6.824,7.192L38.55,28.369" transform="translate(-27.374 -14.63)" fill="none"
                stroke="currentColor" strokeWidth="1.75" />
        </g>
    </svg>;

const ICON_DUPLICATE = 
    <svg viewBox="0 0 17.752 19.052">
        <g transform="translate(0.875 0.875)">
            <rect width="13.001" height="14.124" rx="1.25" transform="translate(0 3.177)" fill="none" stroke="currentColor"
                strokeLinecap="square" strokeWidth="1.75" />
            <path
                d="M19.348,11.27v-.437a1.345,1.345,0,0,1,1.276-1.4h10.3a1.345,1.345,0,0,1,1.276,1.4V22.151a1.345,1.345,0,0,1-1.276,1.4h-.441"
                transform="translate(-16.197 -9.43)" fill="none" stroke="currentColor" strokeLinecap="square"
                strokeWidth="1.75" />
        </g>
    </svg>;

const ICON_ATTACH = 
    <svg viewBox="0 0 15.717 17.443">
        <path
            d="M25.171,17.179l-6.447,6.44a4.474,4.474,0,0,1-6.074-.163C10.9,21.7,10.605,19.2,12.306,17.444c1.813-1.875,5.526-5.526,7.506-7.506a2.953,2.953,0,0,1,4.413.025,2.928,2.928,0,0,1,0,4.286L17.2,21.3a1.672,1.672,0,0,1-2.5-.022,1.722,1.722,0,0,1,.131-2.415l6.527-6.487"
            transform="translate(-10.198 -8.053)" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>;

const ICON_SAVE_TEMPLATE = 
    <svg viewBox="0 0 15.5 19.054">
        <g transform="translate(0.75 0.75)">
            <path d="M18.891,21.977H11.06V10.05l4-4.3h8.577V17.008" transform="translate(-11.06 -5.75)" fill="none"
                stroke="currentColor" strokeWidth="1.5" />
            <path d="M15.066,5.75l-.007,4.3h-4" transform="translate(-11.06 -5.75)" fill="none" stroke="currentColor"
                strokeWidth="1.5" />
            <line x2="4.016" transform="translate(1.722 13.351)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x2="5.019" transform="translate(1.722 11.168)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x2="9.031" transform="translate(1.722 9.128)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x2="9.031" transform="translate(1.722 7.089)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="3.347" cy="3.347" r="3.347" transform="translate(7.306 10.86)" fill="none" stroke="currentColor"
                strokeWidth="1.5" />
            <line y2="3.665" transform="translate(10.653 12.375)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x2="3.661" transform="translate(8.824 14.207)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>
    </svg>;

const ICON_STAR = 
    <svg viewBox="0 0 19.77 18.578">
        <path
            d="M17.691,10.17l2.619,5.2a.211.211,0,0,0,.161.115l5.836.831a.218.218,0,0,1,.115.383L22.21,20.717a.214.214,0,0,0-.061.2l1,5.7a.214.214,0,0,1-.31.23L17.6,24.16a.226.226,0,0,0-.2,0l-5.235,2.681a.214.214,0,0,1-.31-.23l1-5.7a.214.214,0,0,0-.061-.2L8.576,16.688a.218.218,0,0,1,.115-.383l5.844-.831a.211.211,0,0,0,.161-.115l2.612-5.189a.214.214,0,0,1,.383,0Z"
            transform="translate(-7.614 -9.177)" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>;

const ICON_TRASH = 
    <svg viewBox="0 0 28.646 42">
        <g transform="translate(1 1)">
            <path
                d="M35.987,43.15H17.54a.683.683,0,0,1-.683-.683L15.49,17.87H38.016l-1.366,24.6A.683.683,0,0,1,35.987,43.15Z"
                transform="translate(-13.447 -10.15)" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path
                d="M38.8,16.275H12.842c-.191,0-.342-.109-.342-.239l.635-2.972a.335.335,0,0,1,.342-.2H38.169a.335.335,0,0,1,.342.2l.635,2.972C39.146,16.166,39,16.275,38.8,16.275Z"
                transform="translate(-12.5 -8.562)" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <line y2="17.081" transform="translate(7.857 11.526)" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <line y2="17.081" transform="translate(13.323 11.526)" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <line y2="17.081" transform="translate(18.789 11.526)" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M25.73,10.868V7.253a.683.683,0,0,1,.683-.683h7.2a.683.683,0,0,1,.683.683v3.614"
                transform="translate(-16.691 -6.57)" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </g>
    </svg>;

const ICON_INFO = 
    <svg viewBox="0 0 34 34">
        <g transform="translate(1 1)">
            <line y1="0.383" transform="translate(16.04 8.548)" fill="none" stroke="currentColor" strokeLinecap="square"
                strokeWidth="1.75" />
            <line y1="8.635" x2="0.1" transform="translate(16.04 16.14)" fill="none" stroke="currentColor"
                strokeLinecap="square" strokeWidth="1.75" />
            <circle cx="16" cy="16" r="16" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.75" />
        </g>
    </svg>;

const ICON_SHARE = 
    <svg viewBox="0 0 29.211 34">
        <g transform="translate(1 1)">
            <ellipse cx="4.436" cy="4.354" rx="4.436" ry="4.354" transform="translate(18.339)" fill="none"
                stroke="currentColor" strokeWidth="1.75" />
            <ellipse cx="4.436" cy="4.197" rx="4.436" ry="4.197" transform="translate(0 11.803)" fill="none"
                stroke="currentColor" strokeWidth="1.75" />
            <ellipse cx="4.436" cy="4.354" rx="4.436" ry="4.354" transform="translate(18.339 23.292)" fill="none"
                stroke="currentColor" strokeWidth="1.75" />
            <line y1="6.995" x2="11.015" transform="translate(8.078 6.688)" fill="none" stroke="currentColor"
                strokeWidth="1.75" />
            <line x2="11.015" y2="6.995" transform="translate(8.078 18.317)" fill="none" stroke="currentColor"
                strokeWidth="1.75" />
        </g>
    </svg>;

const ICON_BIN = 
    <svg viewBox="0 0 28.646 35">
        <g transform="translate(1 1)">
            <path
                d="M35.987,43.15H17.54a.683.683,0,0,1-.683-.683L15.49,17.87H38.016l-1.366,24.6A.683.683,0,0,1,35.987,43.15Z"
                transform="translate(-13.447 -10.15)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M38.8,16.275H12.842c-.191,0-.342-.109-.342-.239l.635-2.972a.335.335,0,0,1,.342-.2H38.169a.335.335,0,0,1,.342.2l.635,2.972C39.146,16.166,39,16.275,38.8,16.275Z"
                transform="translate(-12.5 -8.562)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line y2="17.081" transform="translate(7.857 11.526)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line y2="17.081" transform="translate(13.323 11.526)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line y2="17.081" transform="translate(18.789 11.526)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M25.73,10.868V7.253a.683.683,0,0,1,.683-.683h7.2a.683.683,0,0,1,.683.683v3.614"
                transform="translate(-16.691 -6.57)" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </g>
    </svg>;

const ICON_COPY = 
    <svg viewBox="0 0 17.752 19.052">
        <g transform="translate(0.875 0.875)">
            <rect width="13.001" height="14.124" rx="1.25" transform="translate(0 3.177)" fill="none" stroke="currentColor"
                strokeLinecap="square" strokeWidth="1.0" />
            <path
                d="M19.348,11.27v-.437a1.345,1.345,0,0,1,1.276-1.4h10.3a1.345,1.345,0,0,1,1.276,1.4V22.151a1.345,1.345,0,0,1-1.276,1.4h-.441"
                transform="translate(-16.197 -9.43)" fill="none" stroke="currentColor" strokeLinecap="square"
                strokeWidth="1.0" />
        </g>
    </svg>;

const ICON_CROSS = 
    <svg viewBox="0 0 31.422 31.406">
        <g transform="translate(0.711 0.703)">
            <line x2="29.668" y2="30" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <line x1="29.668" y2="30" transform="translate(0.332)" fill="none" stroke="currentColor" strokeWidth="1.75" />
        </g>
    </svg>;

const ICON_LINK = 
    <svg viewBox="0 0 15.25 19.032">
        <g transform="translate(0.125 0.125)">
            <g>
                <path
                    d="M12.67,2a2,2,0,0,1,1.985,1.777h1.567a2,2,0,0,1,2,1.863l0,.137v7.333H16.889V5.778a.667.667,0,0,0-.576-.661l-.09-.006H14.327a2,2,0,0,1-1.658.883H9.553a2,2,0,0,1-1.658-.883H6a.667.667,0,0,0-.661.576l-.006.09v12A.675.675,0,0,0,6,18.455v1.327a2,2,0,0,1-2-1.863l0-.137v-12a2,2,0,0,1,1.863-2l.137,0H7.568A2,2,0,0,1,9.553,2Zm2.108,12.111h.889a3.333,3.333,0,0,1,.18,6.662l-.177,0-.889,0a.667.667,0,0,1-.1-1.327l.09-.006.892,0a2,2,0,0,0,.137-4l-.137,0h-.889a.667.667,0,0,1-.09-1.327l.09-.006h0Zm-4.444,0h.889a.667.667,0,0,1,.09,1.327l-.09.006h-.889a2,2,0,0,0-.137,4l.137,0h.889a.667.667,0,0,1,.09,1.327l-.09.006h-.889a3.333,3.333,0,0,1-.177-6.662l.177,0h0Zm0,2.667h5.333a.667.667,0,0,1,.09,1.327l-.09.006H10.333a.667.667,0,0,1-.09-1.327l.09-.006h0ZM12.67,3.333H9.553a.664.664,0,1,0,0,1.327H12.67a.664.664,0,1,0,0-1.327Z"
                    transform="translate(-4 -2)" stroke="currentColor" fill="currentColor" strokeWidth="0.5" />
            </g>
        </g>
    </svg>;

const ICON_FORWARD = 
    <svg viewBox="0 0 18.893 17.766">
        <g transform="translate(0.875 0.891)">
            <path d="M10.272,20.66h3.194v6.308H10.272a.762.762,0,0,1-.762-.762V21.422A.762.762,0,0,1,10.272,20.66Z"
                transform="translate(-9.51 -16.986)" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <path
                d="M19.89,21V14.694s1.666.038,4.436,0,6.014-1.791,8.122-3.583a.381.381,0,0,1,.629.286V24.314a.381.381,0,0,1-.614.3c-1.357-1.067-4.734-3.453-8-3.552C22.546,21,21,21,19.89,21Z"
                transform="translate(-15.934 -11.02)" fill="none" stroke="currentColor" strokeWidth="1.75" />
            <path
                d="M18.463,43.234H16.633a.762.762,0,0,1-.762-.762L15.49,37.22h3.354l.381,5.252A.762.762,0,0,1,18.463,43.234Z"
                transform="translate(-13.211 -27.234)" fill="none" stroke="currentColor" strokeWidth="1.75" />
        </g>
    </svg>;

const ICON_ARCHIVE = 
    <svg viewBox="0 0 18.5 18">
        <g transform="translate(0.25 0.25)">
            <path
                d="M17.473,60.25H.527A.527.527,0,0,0,0,60.777v3.177a.527.527,0,0,0,.527.527h.532v9a.527.527,0,0,0,.527.527H16.414a.527.527,0,0,0,.527-.527v-9h.532A.527.527,0,0,0,18,63.955V60.777A.527.527,0,0,0,17.473,60.25ZM15.886,72.959H2.114V64.482H15.886Zm1.059-9.532H1.055V61.3H16.945Z"
                transform="translate(0 -60.25)" stroke="currentColor" fill="currentColor" strokeWidth="0.5" />
            <path
                d="M182.336,214.048h2.118a1.586,1.586,0,0,0,0-3.173h-2.118a1.586,1.586,0,0,0,0,3.173Zm0-2.118h2.118a.532.532,0,0,1,0,1.063h-2.118a.532.532,0,0,1,0-1.063Z"
                transform="translate(-174.396 -205.58)" stroke="currentColor" fill="currentColor" strokeWidth="0.5" />
        </g>
    </svg>;

const ICON_SUBSCRIBE = 
    <svg viewBox="0 0 16.17 19.5">
        <g transform="translate(0.75 0.75)">
            <path
                d="M12,26.816V24.96A1.9,1.9,0,0,0,13.852,23.1V17.237a4.875,4.875,0,0,1,5.237-4.867c4.647,0,5.747,2.707,5.747,4.691v6.374s-.136,1.54,1.834,1.54v1.834Z"
                transform="translate(-12 -10.569)" fill="none" stroke="currentColor" strokeLinecap="round"
                strokeWidth="1.75" />
            <path d="M30.958,9.4V8.894a1.434,1.434,0,1,0-2.868,0v.462" transform="translate(-22.189 -7.46)" fill="none"
                stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
            <path d="M29.946,51.76a1.753,1.753,0,1,1-3.506,0" transform="translate(-21.144 -35.513)" fill="none"
                stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
        </g>
    </svg>;

const ICON_EDIT = 
    <svg viewBox="0 0 18.002 18.055">
        <g transform="translate(1.002 1)">
            <path
                d="M10.353,23.206l-.277,2.448a.365.365,0,0,0,.4.4l2.434-.281a.365.365,0,0,0,.215-.106L25.859,12.9a.73.73,0,0,0,0-1.033l-1.638-1.645a.73.73,0,0,0-1.036,0L10.459,22.994a.365.365,0,0,0-.106.212Z"
                transform="translate(-10.073 -10.008)" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x2="2.638" y2="2.714" transform="translate(11.397 1.934)" fill="none" stroke="currentColor"
                strokeWidth="2" />
        </g>
    </svg>;

const ICON_MENU = 
    <svg viewBox="-2 -2 20 16.546">
        <g transform="translate(0 1)">
            <line fill="none" stroke="currentColor" strokeWidth="2" x2={16} transform="translate(0 5.273)" />
            <line fill="none" stroke="currentColor" strokeWidth="2" x2={16} />
            <line fill="none" stroke="currentColor" strokeWidth="2" x2={16} transform="translate(0 10.546)" />
        </g>
    </svg>;

const ICON_LOGOUT = 
    <svg viewBox="6 6 58 58" strokeWidth="2" stroke="currentColor" fill="none">
        <polyline points="46.02 21.95 55.93 31.86 46.02 41.77" />
        <line x1="55.93" y1="31.86" x2="19.59" y2="31.86" />
        <path d="M40,38.18V52a2.8,2.8,0,0,1-2.81,2.8H12A2.8,2.8,0,0,1,9.16,52V11.77A2.8,2.8,0,0,1,12,9H37.19A2.8,2.8,0,0,1,40,11.77V25" />
    </svg>;

const ICON_BOARDS = 
    <svg viewBox="-1 -1 19 17" strokeWidth="1.5">
        <g id="boards" transform="translate(0 1)">
            <g transform="translate(0 3)" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="8" height="12" stroke="none"/>
                <rect x="1" y="1" width="6" height="10" fill="none"/>
            </g>
            <g transform="translate(10 3)" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="8" height="9" stroke="none"/>
                <rect x="1" y="1" width="6" height="7" fill="none"/>
            </g>
            <line x2="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <line x2="8" transform="translate(10)" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        </g>
    </svg>;

const ICON_SETTINGS = 
<svg viewBox="8 8 56 56" strokeWidth="1.5" stroke="currentColor" fill="none" >
    <path d="M45 14.67l-2.76 2a1 1 0 01-1 .11l-3.59-1.48a1 1 0 01-.61-.76l-.66-3.77a1 1 0 00-1-.84h-4.86a1 1 0 00-1 .77l-.93 3.72a1 1 0 01-.53.65l-3.3 1.66a1 1 0 01-1-.08l-3-2.13a1 1 0 00-1.31.12l-3.65 3.74a1 1 0 00-.13 1.26l1.87 2.88a1 1 0 01.1.89L16.34 27a1 1 0 01-.68.63l-3.85 1.06a1 1 0 00-.74 1v4.74a1 1 0 00.8 1l3.9.8a1 1 0 01.72.57l1.42 3.15a1 1 0 01-.05.92l-2.13 3.63a1 1 0 00.17 1.24L19.32 49a1 1 0 001.29.09L23.49 47a1 1 0 011-.1l3.74 1.67a1 1 0 01.59.75l.66 3.79a1 1 0 001 .84h4.89a1 1 0 001-.86l.58-4a1 1 0 01.58-.77l3.58-1.62a1 1 0 011 .09l3.14 2.12a1 1 0 001.3-.15l3.45-3.7a1 1 0 00.09-1.27l-2.08-3a1 1 0 01-.09-1l1.48-3.43a1 1 0 01.71-.59l3.66-.77a1 1 0 00.8-1v-4.58a1 1 0 00-.8-1l-3.72-.78a1 1 0 01-.73-.62l-1.45-3.65a1 1 0 01.11-.94l2.15-3.14A1 1 0 0050 18l-3.71-3.25a1 1 0 00-1.29-.08z"></path>
    <circle cx="32.82" cy="31.94" r="9.94"></circle>
</svg>;


export {
    ICON_DESCRIPTION, ICON_PLUS, ICON_UNLOCKED, ICON_OPTIONS, ICON_DROPDOWN_ARROW, ICON_CHECK, ICON_CALENDAR,
    ICON_SCHEDULLE, ICON_TAG, ICON_ADD_TAG, ICON_ASSIGNEES, ICON_ADD_USER, ICON_ARROW_RIGHT, ICON_DUPLICATE, ICON_ATTACH,
    ICON_SAVE_TEMPLATE, ICON_STAR, ICON_TRASH, ICON_INFO, ICON_SHARE, ICON_BIN, ICON_COPY, ICON_CROSS, ICON_LINK,
    ICON_FORWARD, ICON_ARCHIVE, ICON_SUBSCRIBE, ICON_EDIT, ICON_MENU, ICON_LOGOUT, ICON_BOARDS, ICON_SETTINGS
};