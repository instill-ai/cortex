import React from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type SalesforceIconProps = Omit<
  IconBaseProps,
  "viewBox" | "fill" | "color"
>;

const SalesforceIcon: React.FC<SalesforceIconProps> = (props) => {
  const { width, height, position, style } = props;
  return (
    <IconBase
      viewBox="0 0 30 30"
      width={width}
      height={height}
      position={position}
      style={style}
      fill="none"
    >
      <path
        d="M13.0377 8.66741C13.7924 7.88972 14.843 7.40738 16.005 7.40738C17.5497 7.40738 18.8973 8.25924 19.615 9.52385C20.2387 9.24827 20.929 9.09496 21.6553 9.09496C24.4413 9.09496 26.7 11.3483 26.7 14.1277C26.7 16.9075 24.4413 19.1608 21.6553 19.1608C21.3217 19.161 20.9888 19.1282 20.6617 19.0629C20.0297 20.1778 18.8254 20.9311 17.443 20.9311C16.8643 20.9311 16.317 20.7989 15.8297 20.5638C15.189 22.0543 13.6964 23.0993 11.9567 23.0993C10.145 23.0993 8.60101 21.9656 8.00835 20.3756C7.74935 20.43 7.48101 20.4584 7.20567 20.4584C5.04868 20.4584 3.3 18.7111 3.3 16.5554C3.3 15.1108 4.08567 13.8495 5.253 13.1746C5.01268 12.6277 4.879 12.0241 4.879 11.3895C4.879 8.91035 6.914 6.9007 9.42401 6.9007C10.8977 6.9007 12.2073 7.59366 13.0377 8.66741Z"
        fill="#00A1E0"
      />
      <path
        d="M6.68928 15.3009C6.67461 15.3388 6.69462 15.3467 6.69928 15.3533C6.74327 15.385 6.78796 15.4077 6.83296 15.4331C7.07162 15.5584 7.29697 15.5949 7.53264 15.5949C8.01263 15.5949 8.31062 15.3424 8.31062 14.9359V14.928C8.31062 14.5522 7.97431 14.4157 7.65863 14.3171L7.61764 14.304C7.37963 14.2275 7.1743 14.1616 7.1743 14.0066V13.9984C7.1743 13.8658 7.2943 13.7683 7.48031 13.7683C7.68697 13.7683 7.93231 13.8362 8.0903 13.9225C8.0903 13.9225 8.13663 13.9522 8.15364 13.9077C8.16296 13.884 8.24297 13.671 8.25131 13.6479C8.26031 13.6229 8.24431 13.6044 8.22798 13.5945C8.04765 13.486 7.7983 13.4119 7.54032 13.4119L7.49232 13.4122C7.05299 13.4122 6.74634 13.6746 6.74634 14.0508V14.0587C6.74634 14.4553 7.08466 14.5838 7.40168 14.6735L7.45267 14.689C7.68367 14.7592 7.88268 14.8195 7.88268 14.9804V14.9884C7.88268 15.1354 7.75336 15.2448 7.54468 15.2448C7.46368 15.2448 7.20534 15.2432 6.92634 15.0688C6.89266 15.0493 6.87301 15.0352 6.84701 15.0197C6.83335 15.0111 6.79901 14.9962 6.78402 15.0411L6.68928 15.3009ZM13.7163 15.3009C13.7016 15.3388 13.7216 15.3467 13.7263 15.3533C13.7702 15.385 13.8149 15.4077 13.8599 15.4331C14.0986 15.5584 14.324 15.5949 14.5596 15.5949C15.0396 15.5949 15.3376 15.3424 15.3376 14.9359V14.928C15.3376 14.5522 15.0013 14.4157 14.6856 14.3171L14.6446 14.304C14.4066 14.2275 14.2012 14.1616 14.2012 14.0066V13.9984C14.2012 13.8658 14.3212 13.7683 14.5072 13.7683C14.7139 13.7683 14.9592 13.8362 15.1173 13.9225C15.1173 13.9225 15.1636 13.9522 15.1806 13.9077C15.1899 13.884 15.2699 13.671 15.2782 13.6479C15.2873 13.6229 15.2712 13.6044 15.2549 13.5945C15.0746 13.486 14.8252 13.4119 14.5672 13.4119L14.5192 13.4122C14.0799 13.4122 13.7732 13.6746 13.7732 14.0508V14.0587C13.7732 14.4553 14.1116 14.5838 14.4286 14.6735L14.4796 14.689C14.7106 14.7592 14.9099 14.8195 14.9099 14.9804V14.9884C14.9099 15.1354 14.7803 15.2448 14.5716 15.2448C14.4906 15.2448 14.2323 15.2432 13.9533 15.0688C13.9196 15.0493 13.8996 15.0358 13.8743 15.0197C13.8656 15.014 13.8249 14.9985 13.8109 15.0411L13.7163 15.3009ZM18.5134 14.5047C18.5134 14.7345 18.4701 14.9154 18.3847 15.0434C18.3004 15.17 18.1727 15.2316 17.9948 15.2316C17.8164 15.2316 17.6894 15.1703 17.6064 15.0434C17.5224 14.9158 17.4798 14.7345 17.4798 14.5047C17.4798 14.2752 17.5224 14.0946 17.6064 13.968C17.6894 13.8427 17.8164 13.7817 17.9948 13.7817C18.1727 13.7817 18.3004 13.8427 18.3851 13.968C18.4701 14.0945 18.5134 14.2752 18.5134 14.5047ZM18.9141 14.0787C18.8747 13.9472 18.8134 13.8311 18.7317 13.7346C18.6501 13.6376 18.5467 13.5598 18.4241 13.5031C18.3017 13.4468 18.1571 13.4181 17.9948 13.4181C17.8321 13.4181 17.6874 13.4468 17.5651 13.5031C17.4424 13.5598 17.3391 13.6377 17.2571 13.7346C17.1758 13.8315 17.1144 13.9475 17.0747 14.0787C17.0357 14.2096 17.0161 14.3527 17.0161 14.5047C17.0161 14.6567 17.0357 14.8001 17.0747 14.9306C17.1144 15.0618 17.1754 15.1779 17.2574 15.2748C17.3391 15.3717 17.4428 15.4492 17.5651 15.5042C17.6877 15.5593 17.8321 15.5873 17.9948 15.5873C18.1571 15.5873 18.3014 15.5593 18.4241 15.5042C18.5464 15.4492 18.6501 15.3717 18.7318 15.2748C18.8134 15.1782 18.8747 15.0621 18.9141 14.9306C18.9534 14.7997 18.9731 14.6563 18.9731 14.5047C18.9731 14.353 18.9534 14.2096 18.9141 14.0787ZM22.2043 15.1702C22.191 15.1317 22.1533 15.1462 22.1533 15.1462C22.095 15.1683 22.0329 15.1887 21.967 15.1989C21.8999 15.2091 21.8263 15.2144 21.7473 15.2144C21.5533 15.2144 21.3993 15.1574 21.289 15.0446C21.1783 14.9319 21.1163 14.7496 21.117 14.503C21.1176 14.2785 21.1723 14.1097 21.2706 13.9811C21.3683 13.8532 21.517 13.7876 21.7153 13.7876C21.8806 13.7876 22.0066 13.8064 22.1386 13.8476C22.1386 13.8476 22.1703 13.8611 22.1853 13.8202C22.2203 13.724 22.2463 13.6551 22.2836 13.5492C22.2943 13.5192 22.2683 13.5064 22.2589 13.5027C22.2069 13.4826 22.0843 13.45 21.9916 13.4362C21.9049 13.423 21.8036 13.4161 21.6909 13.4161C21.5226 13.4161 21.3726 13.4444 21.2443 13.5011C21.1163 13.5575 21.0076 13.6353 20.9216 13.7322C20.8356 13.8292 20.7703 13.9452 20.7266 14.0764C20.6833 14.2072 20.6613 14.351 20.6613 14.503C20.6613 14.8317 20.751 15.0974 20.928 15.2919C21.1053 15.4871 21.3716 15.5863 21.719 15.5863C21.9243 15.5863 22.135 15.5451 22.2863 15.4861C22.2863 15.4861 22.3153 15.4722 22.3026 15.4389L22.2043 15.1702ZM22.9053 14.2846C22.9243 14.157 22.96 14.0508 23.015 13.9681C23.098 13.8425 23.2247 13.7736 23.4027 13.7736C23.5807 13.7736 23.6984 13.8428 23.7827 13.9681C23.8387 14.0508 23.863 14.1616 23.8727 14.2846H22.9053ZM24.2543 14.004C24.2203 13.8771 24.136 13.7488 24.0807 13.6901C23.9933 13.5972 23.908 13.5322 23.8233 13.496C23.7127 13.4491 23.58 13.4182 23.4347 13.4182C23.2653 13.4182 23.1117 13.4462 22.987 13.5042C22.862 13.5622 22.757 13.6414 22.6747 13.7399C22.5923 13.8382 22.5303 13.9552 22.491 14.0881C22.4513 14.2203 22.4313 14.3643 22.4313 14.5163C22.4313 14.6709 22.452 14.815 22.493 14.9445C22.5343 15.0751 22.6003 15.1901 22.6897 15.2854C22.7787 15.3813 22.8933 15.4565 23.0307 15.5089C23.167 15.561 23.3327 15.588 23.523 15.5877C23.9147 15.5864 24.121 15.5 24.206 15.4535C24.221 15.4453 24.2354 15.4308 24.2173 15.3892L24.1287 15.1436C24.1154 15.107 24.0777 15.1205 24.0777 15.1205C23.9806 15.1561 23.8427 15.2201 23.521 15.2195C23.3107 15.2191 23.1546 15.1578 23.057 15.0619C22.9566 14.9636 22.9076 14.8192 22.899 14.6155L24.2553 14.6168C24.2553 14.6168 24.291 14.6162 24.2947 14.5819C24.296 14.5674 24.3413 14.3063 24.2543 14.004ZM12.0431 14.2846C12.0624 14.157 12.0977 14.0508 12.1527 13.9681C12.2357 13.8425 12.3624 13.7736 12.5404 13.7736C12.7184 13.7736 12.8361 13.8428 12.9207 13.9681C12.9764 14.0508 13.0007 14.1616 13.0104 14.2846H12.0431ZM13.3917 14.004C13.3577 13.8771 13.2737 13.7488 13.2184 13.6901C13.1311 13.5972 13.0457 13.5322 12.9611 13.496C12.8504 13.4491 12.7178 13.4182 12.5724 13.4182C12.4034 13.4182 12.2494 13.4462 12.1247 13.5042C11.9998 13.5622 11.8948 13.6414 11.8124 13.7399C11.7301 13.8382 11.6681 13.9552 11.6288 14.0881C11.5894 14.2203 11.5691 14.3643 11.5691 14.5163C11.5691 14.6709 11.5898 14.815 11.6308 14.9445C11.6721 15.0751 11.7381 15.1901 11.8274 15.2854C11.9164 15.3813 12.0311 15.4565 12.1684 15.5089C12.3048 15.561 12.4704 15.588 12.6608 15.5877C13.0524 15.5864 13.2588 15.5 13.3438 15.4535C13.3588 15.4453 13.3731 15.4308 13.3551 15.3892L13.2668 15.1436C13.2531 15.107 13.2155 15.1205 13.2155 15.1205C13.1185 15.1561 12.9808 15.2201 12.6585 15.2195C12.4485 15.2191 12.2925 15.1578 12.1948 15.0619C12.0944 14.9636 12.0455 14.8192 12.0368 14.6155L13.3931 14.6168C13.3931 14.6168 13.4288 14.6162 13.4324 14.5819C13.4337 14.5674 13.479 14.3063 13.3917 14.004ZM9.11137 15.1629C9.05837 15.121 9.05104 15.1105 9.03305 15.0834C9.00637 15.0422 8.99271 14.9835 8.99271 14.909C8.99271 14.791 9.03204 14.7063 9.11372 14.6493C9.11273 14.6496 9.23039 14.5487 9.50704 14.5523C9.70136 14.555 9.87502 14.5833 9.87502 14.5833V15.1932H9.87535C9.87535 15.1932 9.70303 15.2298 9.50903 15.2413C9.23304 15.2578 9.11037 15.1626 9.11137 15.1629ZM9.65103 14.2204C9.59603 14.2164 9.52468 14.2141 9.43935 14.2141C9.32303 14.2141 9.21069 14.2286 9.10535 14.2566C8.99936 14.2846 8.90403 14.3285 8.82202 14.3865C8.74014 14.4443 8.67285 14.52 8.62536 14.6077C8.57737 14.696 8.55303 14.8002 8.55303 14.9169C8.55303 15.0356 8.57369 15.1388 8.61503 15.2232C8.65637 15.3079 8.71603 15.3785 8.79202 15.4329C8.86735 15.4873 8.96036 15.5271 9.06835 15.5512C9.17469 15.5753 9.29534 15.5875 9.42736 15.5875C9.56635 15.5875 9.70502 15.5763 9.83935 15.5535C9.97235 15.5311 10.1357 15.4984 10.181 15.4883C10.2128 15.4807 10.2445 15.4727 10.276 15.4642C10.3097 15.456 10.307 15.4203 10.307 15.4203L10.3063 14.1936C10.3063 13.9246 10.2337 13.7252 10.0907 13.6015C9.94834 13.4783 9.73868 13.4159 9.46769 13.4159C9.36601 13.4159 9.20235 13.4298 9.10435 13.4492C9.10435 13.4492 8.80802 13.5059 8.686 13.6002C8.686 13.6002 8.65935 13.6167 8.67401 13.6536L8.77002 13.9088C8.78202 13.9418 8.81437 13.9306 8.81437 13.9306C8.81437 13.9306 8.8247 13.9266 8.83671 13.9197C9.09772 13.7793 9.42771 13.7835 9.42771 13.7835C9.57438 13.7835 9.68705 13.8125 9.76304 13.8702C9.83703 13.9263 9.8747 14.011 9.8747 14.1897V14.2464C9.75802 14.2299 9.65103 14.2204 9.65103 14.2204ZM20.5904 13.5292C20.6007 13.4988 20.5791 13.4843 20.5701 13.481C20.5471 13.4721 20.4318 13.4481 20.3428 13.4425C20.1724 13.4323 20.0778 13.4606 19.9931 13.4982C19.9091 13.5358 19.8158 13.5964 19.7638 13.6653V13.5021C19.7638 13.4794 19.7474 13.4613 19.7248 13.4613H19.3771C19.3544 13.4613 19.3381 13.4794 19.3381 13.5021V15.5029C19.3381 15.5253 19.3568 15.5438 19.3794 15.5438H19.7358C19.7467 15.5437 19.7571 15.5394 19.7648 15.5317C19.7725 15.5241 19.7768 15.5137 19.7768 15.5029V14.5034C19.7768 14.3692 19.7918 14.2353 19.8218 14.1513C19.8511 14.0682 19.8911 14.0016 19.9404 13.9538C19.9901 13.9063 20.0464 13.873 20.1081 13.8542C20.1711 13.8351 20.2408 13.8289 20.2901 13.8289C20.3611 13.8289 20.4391 13.847 20.4391 13.847C20.4651 13.8499 20.4798 13.8341 20.4884 13.8107C20.5118 13.7494 20.5778 13.5658 20.5904 13.5292Z"
        fill="white"
      />
      <path
        d="M17.2457 12.6019C17.2024 12.5887 17.163 12.5798 17.1117 12.5702C17.0597 12.561 16.9977 12.5564 16.9274 12.5564C16.682 12.5564 16.4887 12.625 16.353 12.7601C16.218 12.8946 16.1263 13.0994 16.0803 13.3687L16.0637 13.4594H15.7557C15.7557 13.4594 15.7184 13.458 15.7103 13.4983L15.66 13.7775C15.6564 13.8039 15.668 13.8207 15.704 13.8207H16.0037L15.6997 15.4994C15.676 15.6345 15.6487 15.7456 15.6183 15.83C15.5887 15.9131 15.5597 15.9754 15.5237 16.0209C15.489 16.0644 15.4563 16.0967 15.3997 16.1155C15.353 16.131 15.299 16.1383 15.24 16.1383C15.2073 16.1383 15.1637 16.133 15.1313 16.1264C15.0993 16.1201 15.0823 16.1132 15.058 16.103C15.058 16.103 15.023 16.0898 15.009 16.1244C14.998 16.1531 14.918 16.3703 14.9083 16.397C14.899 16.4237 14.9123 16.4445 14.9293 16.4508C14.9693 16.4646 14.999 16.4738 15.0533 16.4867C15.1287 16.5042 15.1923 16.5052 15.252 16.5052C15.3766 16.5052 15.4906 16.4877 15.585 16.4541C15.6797 16.4201 15.7623 16.3611 15.8356 16.2813C15.9146 16.1949 15.9643 16.1046 16.0117 15.981C16.0587 15.859 16.099 15.7074 16.131 15.5307L16.4367 13.8207H16.8833C16.8833 13.8207 16.921 13.822 16.9287 13.7815L16.9793 13.5026C16.9827 13.4759 16.9713 13.4594 16.935 13.4594H16.5013C16.5037 13.4498 16.5233 13.2988 16.573 13.1568C16.5943 13.0964 16.6343 13.0473 16.668 13.0137C16.7013 12.9807 16.7397 12.9573 16.7817 12.9438C16.8247 12.9299 16.8737 12.9233 16.9274 12.9233C16.968 12.9233 17.0083 12.928 17.0387 12.9342C17.0807 12.9431 17.097 12.9477 17.108 12.9511C17.1524 12.9642 17.1583 12.9514 17.167 12.9303L17.2707 12.6488C17.2814 12.6184 17.255 12.6055 17.2457 12.6019ZM11.1865 15.503C11.1865 15.5254 11.1702 15.5436 11.1475 15.5436H10.7879C10.7652 15.5436 10.7492 15.5254 10.7492 15.503V12.6401C10.7492 12.6177 10.7652 12.5996 10.7879 12.5996H11.1475C11.1702 12.5996 11.1865 12.6177 11.1865 12.6401V15.503Z"
        fill="white"
      />
    </IconBase>
  );
};

export default SalesforceIcon;
