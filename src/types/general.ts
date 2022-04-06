export interface BasicInputFieldAttributes {
  /** Input field's id */
  id: string;

  /**
   * Whether the input is disabled
   */
  disabled: boolean;

  /** TailwindCSS format
   * Background color when input is disabled
   * - Please add persudo class disabled, eg: disabled:bg-white
   */
  disabledBgColor: string;

  /** Whether the input is valid or not */
  valid: boolean;

  /**
   * Text that appears in the form control when it has no value set
   */
  placeholder: string;

  /**
   * Whether The value is editable or not.
   */
  readOnly: boolean;

  /** TailwindCSS format
   * Background color when input is readOnly
   */
  readOnlyBgColor: string;

  /** TailwindCSS format
   * - Input's font size
   */
  fontSize: string;

  /** TailwindCSS format
   * - Input's font line height
   */
  lineHeight: string;

  /** TailwindCSS format
   * - Input's font weight
   */
  fontWeight: string;

  /** TailwindCSS format
   * - Input's text color
   */
  textColor: string;

  /** TailwindCSS format
   * - Input's background color
   */
  bgColor: string;

  /** Input on change handler */
  onChangeInput: (inputValue: string) => void;

  /** Whether the field is necessary or not */
  required: boolean;

  /** Field's label Name */
  labelName: string;

  /** TailwindCSS format
   * - Default is w-full, please make sure this component's parent has defined width
   * - if you are not sure about the defined number, please use abitrary number like w-[number-unit] w-[20px].
   */
  inputWidth: string;

  /** focusHighlight
   * - enable: border highlight with intstill blue30
   * - disable: remove default input border highlight, the border will remain initial color and width
   */
  focusHighlight: boolean;

  /** TailwindCSS format
   * - Default is h-[70px]
   * - if you are not sure about the defined number, please use abitrary number like w-[number-unit] w-[20px].
   */
  inputHeight: string;

  /** Specific whether browser should help user auto complete the input or not */
  autoComplete: string;
}
