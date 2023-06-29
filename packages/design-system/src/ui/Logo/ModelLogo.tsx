export type ModelLogoProps = {
  variant: "square" | "expand";
  className?: string;
  width: number;
};

export const ModelLogo = (props: ModelLogoProps) => {
  const { variant, width, className } = props;

  switch (variant) {
    case "square": {
      return (
        <svg
          viewBox="0 0 121 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: `${width}px` }}
          className={className}
        >
          <path
            d="M30.6391 9.95481H10.5898V110.202H30.6391V50.34H50.6885V30.2906H30.6391V9.95481ZM90.7872 30.2906H70.7378V50.34H90.7872V110.202H110.837V9.95481H90.7872V30.2906ZM70.7378 70.3893V50.34H50.6885V70.3893H70.7378Z"
            fill="#F6F6F6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M40.4091 0.184814V20.5206H60.4585V40.57H60.9678V20.5206H81.0172V0.184814H120.607V119.972H81.0172V60.11H80.5078V80.1593H40.9185V60.11H40.4091V119.972H0.819763V0.184814H40.4091ZM30.6391 9.95481V30.2906H50.6885V50.34H30.6391V110.202H10.5898V9.95481H30.6391ZM50.6885 50.34V70.3893H70.7378V50.34H90.7872V110.202H110.837V9.95481H90.7872V30.2906H70.7378V50.34H50.6885Z"
            fill="#2B2B2B"
          />
          <path
            d="M10.5124 9.95481H31.2844V50.4938H10.5124V9.95481Z"
            fill="#FFDF3A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.742371 0.184814H41.0544V60.2638H0.742371V0.184814ZM10.5124 9.95481V50.4938H31.2844V9.95481H10.5124Z"
            fill="#2B2B2B"
          />
          <path
            d="M30.6143 30.0569H50.7162V50.4938H30.6143V30.0569Z"
            fill="#FFDF3A"
          />
          <path
            d="M110.837 110.387H90.7886L90.7886 50.3368H110.837L110.837 110.387Z"
            fill="#40A8F5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M110.837 60.1068L110.837 50.3368H90.7886L90.7886 60.1068H110.837Z"
            fill="#2B2B2B"
          />
          <path
            d="M50.6643 50.3076H70.7404V70.3837H50.6643V50.3076Z"
            fill="#28F67E"
          />
        </svg>
      );
    }
    default: {
      return (
        <svg
          viewBox="0 0 322 122"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: `${width}px` }}
          className={className}
        >
          <path
            d="M251.265 10.6588H231.019V111.174H311.431V90.9273H251.265V10.6588Z"
            fill="#F6F6F6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M261.035 0.889404V81.1579H321.2V120.943H221.249V0.889404H261.035ZM311.431 90.9273V111.174H231.019V10.6588H251.265V90.9273H311.431Z"
            fill="#2B2B2B"
          />
          <path
            d="M231.019 10.6588H251.484V30.7887H231.019V10.6588Z"
            fill="#40A8F5"
          />
          <path
            d="M231.019 30.7887H251.484L251.484 50.9185H231.019L231.019 30.7887Z"
            fill="#40A8F5"
          />
          <path
            d="M231.019 50.9185H251.484V71.0483H231.019V50.9185Z"
            fill="#40A8F5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M231.019 66.1636H251.484V75.933H231.019V66.1636Z"
            fill="#2B2B2B"
          />
          <path
            d="M201.146 30.9292V10.8262H120.734V111.341H201.146V91.2382H140.837V30.9292H201.146ZM201.146 91.2382H221.249V30.9292H201.146V91.2382Z"
            fill="#F6F6F6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M210.916 1.05676V21.1598H231.019V101.008H210.916V121.111H110.965V1.05676H210.916ZM201.146 91.2382V111.341H120.734V10.8262H201.146V30.9292H140.837V91.2382H201.146ZM150.607 81.4688H191.377V40.6986H150.607V81.4688ZM201.146 30.9292V91.2382H221.249V30.9292H201.146Z"
            fill="#2B2B2B"
          />
          <path
            d="M120.734 91.3456H140.864V111.475H120.734V91.3456Z"
            fill="#FFDF3A"
          />
          <path
            d="M140.64 91.0101H160.77V111.475H140.64V91.0101Z"
            fill="#FFDF3A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M155.886 111.475V91.0101H165.655V111.475H155.886Z"
            fill="#2B2B2B"
          />
          <path
            d="M140.864 91.3456H120.734L120.734 71.2157H140.864L140.864 91.3456Z"
            fill="#FFDF3A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M140.864 76.1004H120.734V66.331H140.864V76.1004Z"
            fill="#2B2B2B"
          />
          <path
            d="M30.5528 10.826H10.4498V111.341H30.5528V51.3192H50.6558V31.2162H30.5528V10.826ZM90.8619 31.2162H70.7589V51.3192H90.8619V111.341H110.965V10.826H90.8619V31.2162ZM70.7589 71.4222V51.3192H50.6558V71.4222H70.7589Z"
            fill="#F6F6F6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M40.3222 1.05655V21.4468H60.4253V41.5498H60.9894V21.4468H81.0925V1.05655H120.734V121.11H81.0925V61.0886H80.5283V81.1916H40.8864V61.0886H40.3222V121.11H0.68042V1.05655H40.3222ZM30.5528 10.826V31.2162H50.6558V51.3192H30.5528V111.341H10.4498V10.826H30.5528ZM50.6558 51.3192V71.4222H70.7589V51.3192H90.8619V111.341H110.965V10.826H90.8619V31.2162H70.7589V51.3192H50.6558Z"
            fill="#2B2B2B"
          />
          <path
            d="M50.6312 51.2872H70.7611V71.4171H50.6312V51.2872Z"
            fill="#28F67E"
          />
        </svg>
      );
    }
  }
};
