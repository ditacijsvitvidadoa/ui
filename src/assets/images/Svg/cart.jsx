export default function CartIcon({ color = '#292929', strokeColor = '#292929', className = '' }) {
    return (
        <svg
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ fill: color, stroke: strokeColor, strokeWidth: 0 }}
        >
            <path d="M1.56631 0.0613806C0.942954 -0.146415 0.269169 0.190478 0.061373 0.813849C-0.146407 1.43722 0.190486 2.11101 0.813841 2.31879L1.23408 2.45888C2.3071 2.81653 3.01652 3.05491 3.53914 3.29804C4.03402 3.52825 4.24798 3.71353 4.38508 3.90374C4.52217 4.09394 4.63028 4.35551 4.69218 4.89779C4.75757 5.47048 4.75936 6.21887 4.75936 7.34994V11.5884C4.75933 13.7578 4.75931 15.5065 4.94422 16.8818C5.13618 18.3097 5.54689 19.512 6.50172 20.4668C7.45658 21.4216 8.65882 21.8323 10.0867 22.0243C11.462 22.2093 13.2107 22.2093 15.3801 22.2093H26.5716C27.2287 22.2093 27.7614 21.6766 27.7614 21.0195C27.7614 20.3623 27.2287 19.8297 26.5716 19.8297H15.4672C13.1901 19.8297 11.602 19.8272 10.4038 19.666C9.23976 19.5096 8.62335 19.2233 8.1843 18.7843C7.81122 18.4112 7.54846 17.9099 7.38191 17.0536H23.4338C24.9559 17.0536 25.7169 17.0536 26.3129 16.6605C26.9089 16.2676 27.2086 15.5682 27.8082 14.1692L28.488 12.5828C29.7721 9.58653 30.4143 8.08837 29.709 7.01874C29.0037 5.94913 27.3737 5.94913 24.1138 5.94913H7.13104C7.12168 5.46102 7.10119 5.02065 7.05634 4.62789C6.96854 3.8588 6.77723 3.15309 6.31544 2.5124C5.85365 1.87172 5.24467 1.46706 4.54282 1.14054C3.88252 0.833377 3.04283 0.553513 2.04918 0.222331L1.56631 0.0613806Z" />
            <path d="M9.91468 24.9854C11.2289 24.9854 12.2942 26.0508 12.2942 27.3649C12.2942 28.679 11.2289 29.7444 9.91468 29.7444C8.6005 29.7444 7.53516 28.679 7.53516 27.3649C7.53516 26.0508 8.6005 24.9854 9.91468 24.9854Z" />
            <path d="M24.1918 24.9855C25.5059 24.9855 26.5713 26.0507 26.5713 27.365C26.5713 28.6792 25.5059 29.7445 24.1918 29.7445C22.8776 29.7445 21.8123 28.6792 21.8123 27.365C21.8123 26.0507 22.8776 24.9855 24.1918 24.9855Z" />
        </svg>
    );
}
