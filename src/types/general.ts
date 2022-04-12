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

  /** Whether the input has error or not */
  error: boolean;

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
  inputFontSize: string;

  /** TailwindCSS format
   * - Input's font line height
   */
  inputLineHeight: string;

  /** TailwindCSS format
   * - Input's font weight
   */
  inputFontWeight: string;

  /** TailwindCSS format
   * - Input's text color
   */
  inputTextColor: string;

  /** TailwindCSS format
   * - Input's background color
   */
  bgColor: string;

  /** TailwindCSS format - The border radius of the input */
  borderRadius: string;

  /** Input on change handler */
  onChangeInput: (inputValue: any) => void;

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

  /** They type of input label
   * - normal: Act as normal positioned title
   * - inset: Stay inside input field, when input field get focused or answered, the label will be pushed upward.
   * - hide: Hide label
   */
  inputLabelType: "normal" | "inset" | "hide";
}
