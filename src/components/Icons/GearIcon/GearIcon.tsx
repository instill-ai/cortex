import { FC } from "react";
import IconBase, { IconBaseProps } from "../IconBase";

export type GearIconProps = Omit<IconBaseProps, "viewBox" | "fill">;

const GearIcon: FC<GearIconProps> = (props) => {
  return (
    <IconBase
      viewBox="0 0 30 30"
      width={props.width}
      height={props.height}
      color={props.color}
      position={props.position}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0611 4.65112L15.6255 8.08658L14.4002 8.0843L11.9777 4.6403C11.2385 4.85649 10.5238 5.15097 9.84686 5.51831L10.5538 9.66918L9.68576 10.534L5.53696 9.81156C5.35448 10.1454 5.1877 10.4924 5.038 10.8519C4.8883 11.2114 4.75955 11.5742 4.65115 11.9389L8.0866 14.3745L8.08432 15.5998L4.64035 18.0222C4.85654 18.7615 5.15102 19.4762 5.51836 20.1531L9.6692 19.4462L10.534 20.3142L9.81158 24.463C10.1454 24.6455 10.4924 24.8123 10.8519 24.962C11.2114 25.1117 11.5742 25.2404 11.939 25.3488L14.3745 21.9134L15.5998 21.9157L18.0223 25.3596C18.7615 25.1435 19.4762 24.849 20.1532 24.4816L19.4462 20.3308L20.3143 19.466L24.463 20.1884C24.6455 19.8545 24.8123 19.5076 24.962 19.1481C25.1117 18.7885 25.2405 18.4258 25.3489 18.0611L21.9134 15.6255L21.9157 14.4002L25.3597 11.9777C25.1435 11.2385 24.849 10.5238 24.4817 9.84684L20.3308 10.5538L19.466 9.68574L20.1884 5.53693C19.8546 5.35444 19.5076 5.18766 19.1481 5.03796C18.7886 4.88826 18.4258 4.75951 18.0611 4.65112ZM17.9319 3.06196C18.5351 3.21085 19.1342 3.40735 19.7247 3.65321C20.3152 3.89907 20.8767 4.1859 21.4073 4.50912L21.7561 5.2783L21.126 8.89674L24.7458 8.28026L25.5135 8.63153C26.1666 9.71151 26.6509 10.8868 26.9482 12.1134L26.6508 12.9035L23.6474 15.0161L26.6436 17.1403L26.938 17.9318C26.7891 18.535 26.5926 19.1342 26.3468 19.7247C26.1009 20.3151 25.8141 20.8767 25.4908 21.4073L24.7217 21.756L21.1033 21.126L21.7197 24.7458L21.3685 25.5135C20.2885 26.1665 19.1132 26.6508 17.8866 26.9481L17.0965 26.6507L14.9839 23.6474L12.8597 26.6436L12.0682 26.938C11.465 26.7891 10.8658 26.5926 10.2753 26.3467C9.68486 26.1009 9.12329 25.814 8.59268 25.4908L8.24398 24.7216L8.87404 21.1032L5.25422 21.7197L4.48653 21.3684C3.83346 20.2885 3.34918 19.1132 3.05186 17.8866L3.34926 17.0965L6.35265 14.9839L3.35638 12.8597L3.062 12.0681C3.21088 11.4649 3.40739 10.8657 3.65325 10.2753C3.89911 9.68482 4.18593 9.12326 4.50915 8.59266L5.27833 8.24395L8.89676 8.87402L8.28028 5.25417L8.63155 4.48647C9.71152 3.83341 10.8868 3.34914 12.1134 3.05182L12.9035 3.34922L15.0161 6.35262L17.1403 3.35634L17.9319 3.06196ZM16.1905 12.1409C14.6115 11.4834 12.7984 12.2304 12.1409 13.8094C11.4834 15.3885 12.2305 17.2015 13.8095 17.859C15.3885 18.5165 17.2016 17.7695 17.8591 16.1904C18.5166 14.6114 17.7695 12.7983 16.1905 12.1409ZM10.7562 13.2328C11.7321 10.889 14.4233 9.78016 16.7671 10.7561C19.1109 11.732 20.2198 14.4232 19.2438 16.767C18.2679 19.1108 15.5767 20.2197 13.2329 19.2438C10.8891 18.2678 9.78022 15.5766 10.7562 13.2328Z"
      />
    </IconBase>
  );
};

export default GearIcon;
