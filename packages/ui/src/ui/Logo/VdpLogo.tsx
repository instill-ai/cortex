import cn from "clsx";

export type VdpLogoProps = {
  type: "square" | "expand";
  position?: string;
  width: number;
};

const VdpLogo = (props: VdpLogoProps) => {
  const { type, width, position } = props;

  switch (type) {
    case "square": {
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: `${width}px` }}
          className={cn(position)}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H40V60H80V0H120V80H100V100H80V120H40V100H20V80H0V0ZM30 10V70H10V10H30ZM49.9997 70.0001V90.0001H29.9997V70.0001H49.9997ZM69.9999 110V90.0001H89.9996V70.0001H69.9996V89.9998H49.9999V110H69.9999ZM110 70V10H89.9998V70H110Z"
            fill="#2B2B2B"
          />
          <path d="M70 110V90H50V110H70Z" fill="#FFDF3A" />
          <path d="M50 90V70H30V90H50Z" fill="#28F77E" />
          <path d="M90 90V70H70V90H90Z" fill="#FFDF3A" />
          <path d="M30 70L30 10L10 10L10 70H30Z" fill="#F7F7F7" />
          <path d="M110 70V10L90 10V70H110Z" fill="#40A8F5" />
        </svg>
      );
    }
    default: {
      return (
        <svg
          viewBox="0 0 340 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: `${width}px` }}
          className={cn(position)}
        >
          <g clipPath="url(#clip0_373_141)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30 70V10H10V70H30ZM49.9997 90.0001V70.0001H29.9997V90.0001H49.9997ZM69.9999 90.0001V110H49.9999V89.9998H69.9996V70.0001H89.9996V90.0001H69.9999ZM110 10V70H89.9998V10H110Z"
              fill="#F7F7F7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H40V60H80V0H120V80H100V100H80V120H40V100H20V80H0V0ZM30 10V70H10V10H30ZM49.9997 70.0001V90.0001H29.9997V70.0001H49.9997ZM69.9999 110V90.0001H89.9996V70.0001H69.9996V89.9998H49.9999V110H69.9999ZM110 70V10H89.9998V70H110Z"
              fill="#2B2B2B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M140 10V110H120V10H140ZM200 29.9999V10H140V30H200V89.9999H220V29.9999H200ZM200 110V90.0001H140V110H200Z"
              fill="#F7F7F7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M130 110L140 110V10H120V110L130 110ZM110 0V120L210 120V99.9999H230V19.9999H210V0H110ZM140 10V30H200V89.9999H220V29.9999L200 30L200 10H140ZM190 80.0001V40H150V80.0001H190ZM200 89.9999L140 90.0001V110L200 110L200 89.9999Z"
              fill="#2B2B2B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M250 10V110H230V10H250ZM310 29.9999V10H250V30H310V69.9999H330V29.9999H310ZM310 90.0002V70.0002H250V90.0002H310Z"
              fill="#F7F7F7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M260 120H220V0H320V19.9999H340V79.9999H320V100H260V120ZM310 90.0002V70.0002H250V90.0002H310ZM250 10H230V110H250V10ZM260 60.0002H300V40H260V60.0002ZM310 30L310 70.0002L330 69.9999V29.9999L310 30L310 10H250V30H310Z"
              fill="#2B2B2B"
            />
            <path d="M30 30V10L10 10V30H30Z" fill="#28F77E" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40 0V40H3.8147e-06V0L40 0ZM30 30L10 30L10 10L30 10V30Z"
              fill="#2B2B2B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M140 70V110H120V70H140ZM140 90H160V110H140V90Z"
              fill="#FFDF3A"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M110 120V60H150V80H170V120H110ZM140 90L140 70H120V110H140H160V90H140Z"
              fill="#2B2B2B"
            />
            <path d="M250 110V50H230V110H250Z" fill="#40A8F5" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M260 40V120H220V40H260ZM250 110H230V50H250V110Z"
              fill="#2B2B2B"
            />
          </g>
          <defs>
            <clipPath id="clip0_373_141">
              <rect width="340" height="120" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    }
  }
};

export default VdpLogo;
