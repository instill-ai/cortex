import { ReactNode } from "react";

export interface BasicInputFieldAttributes {
  /** Input field's id */
  id: string;

  /** Whether the input has error or not */
  error: Nullable<string>;

  /**
   * The additional message will display on the label
   * - e.g. {label} - {message}
   */

  additionalMessageOnLabel: Nullable<string>;

  /** TailwindCSS format - Background color when input has error
   * - e.g. bg-white
   * - https://tailwindcss.com/docs/background-color
   */
  errorInputBgColor: string;

  /** TailwindCSS format - Border color when input has error
   * - e.g. bg-white
   * - https://tailwindcss.com/docs/background-color
   */
  errorInputBorderColor: string;

  /** TailwindCSS format - Border width when input has error
   * - e.g. border-2
   * - https://tailwindcss.com/docs/border-width
   */
  errorInputBorderWidth: string;

  /** TailwindCSS format - Border style when input has error
   * - e.g. border-dashed
   * - https://tailwindcss.com/docs/border-style
   */
  errorInputBorderStyle: string;

  /** TailwindCSS format - Text color when input has error
   * - e.g. text-instillGrey50
   * - https://tailwindcss.com/docs/text-color
   */
  errorInputTextColor: string;

  /** TailwindCSS format - Label's text color when input has error
   * - e.g. text-instillGrey50
   */
  errorLabelTextColor: string;

  /** TailwindCSS format - Label's font weight when input has error
   * - e.g. font-normal
   */
  errorLabelFontWeight: string;

  /** TailwindCSS format - Label's font size when input has error
   * - e.g. text-base
   */
  errorLabelFontSize: string;

  /** TailwindCSS format - Label's font family when input has error
   * - e.g. font-sans
   */
  errorLabelFontFamily: string;

  /** TailwindCSS format - Label's line height when input has error
   * - e.g. leading-normal
   */
  errorLabelLineHeight: string;

  /** Field's label Name */
  label: Nullable<string>;

  /** Field's description */
  description: string;

  /** TailwindCSS format - Background color of input
   * - e.g. bg-white
   * - https://tailwindcss.com/docs/background-color
   */
  inputBgColor: string;

  /**
   * Whether the input is disabled
   */
  disabled: boolean;

  /** TailwindCSS format - Background color when input is disabled
   * - e.g. bg-white
   * - https://tailwindcss.com/docs/background-color
   */
  disabledInputBgColor: string;

  /** TailwindCSS format - Border color when input is disabled
   * - e.g. border-instillGrey30
   * - https://tailwindcss.com/docs/border-color
   */
  disabledInputBorderColor: string;

  /** TailwindCSS format - Border width when input is disabled
   * - e.g. border-2
   * - https://tailwindcss.com/docs/border-width
   */
  disabledInputBorderWidth: string;

  /** TailwindCSS format - Border style when input is disabled
   * - e.g. border-dashed
   * - https://tailwindcss.com/docs/border-style
   */
  disabledInputBorderStyle: string;

  /** TailwindCSS format - Text color when input is disabled
   * - e.g. text-instillGrey50
   * - https://tailwindcss.com/docs/text-color
   */
  disabledInputTextColor: string;

  /** TailwindCSS format - Cursor when input is disabled
   * - e.g. cursor-not-allowed
   * - https://tailwindcss.com/docs/cursor
   */
  disabledCursor: string;

  /**
   * Text that appears in the form control when it has no value set
   */
  placeholder: string;

  /**
   * Whether The value is editable or not.
   */
  readOnly: boolean;

  /** TailwindCSS format - Background color when input is read-only
   * - e.g. bg-white
   * - https://tailwindcss.com/docs/background-color
   */
  readOnlyInputBgColor: string;

  /** TailwindCSS format - Border color when input is read-only
   * - e.g. border-instillGrey30
   * - https://tailwindcss.com/docs/border-color
   */
  readOnlyInputBorderColor: string;

  /** TailwindCSS format - Border width when input is read-only
   * - e.g. border-2
   * - https://tailwindcss.com/docs/border-width
   */
  readOnlyInputBorderWidth: string;

  /** TailwindCSS format - Border style when input is read-only
   * - e.g. border-dashed
   * - https://tailwindcss.com/docs/border-style
   */
  readOnlyInputBorderStyle: string;

  /** TailwindCSS format - Text color when input is read-only
   * - e.g. text-instillGrey50
   * - https://tailwindcss.com/docs/text-color
   */
  readOnlyInputTextColor: string;

  /** TailwindCSS format - Cursor when input is read-only
   * - e.g. cursor-not-allowed
   * - https://tailwindcss.com/docs/cursor
   */
  readOnlyCursor: string;

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

  /** TailwindCSS format - The border color of the input */
  inputBorderColor: string;

  /** TailwindCSS formt - The border style of the input */
  inputBorderStyle: string;

  /** TailwindCSS formt - The border width of the input */
  inputBorderWidth: string;

  /** TailwindCSS format - The border radius of the input */
  inputBorderRadius: string;

  /** Input on change handler */
  onChangeInput: (id: string, inputValue: any) => void;

  /** Whether the field is necessary or not */
  required: boolean;

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

  /** TailwindCSS format - Input placeholder's font size
   * - Please add persudo class "placeholder:"
   * - e.g. placeholder:text-base
   * - https://tailwindcss.com/docs/font-size
   */
  placeholderFontSize: string;

  /** TailwindCSS format - Input placeholder's text color
   * - Please add persudo class "placeholder:"
   * - e.g. placeholder:text-instillGrey50
   * - https://tailwindcss.com/docs/text-color
   */
  placeholderTextColor: string;

  /** TailwindCSS format - Input placeholder's line height
   * - Please add persudo class "placeholder:"
   * - e.g. placeholder:leading-normal
   * - https://tailwindcss.com/docs/line-height
   */
  placeholderLineHeight: string;

  /** TailwindCSS format - Input placeholder's font family
   * - Please add persudo class "placeholder:"
   * - e.g. placeholder:font-sans
   * - https://tailwindcss.com/docs/font-family
   */
  placeholderFontFamily: string;

  /** TailwindCSS format - Input placeholder's font weight
   * - Please add persudo class "placeholder:"
   * - e.g. placeholder:font-normal
   * - https://tailwindcss.com/docs/font-weight
   */
  placeholderFontWeight: string;

  /** TailwindCSS format - Label's text color
   * - e.g. text-instillGrey50
   */
  labelTextColor: string;

  /** TailwindCSS format - Label's font weight
   * - e.g. font-normal
   */
  labelFontWeight: string;

  /** TailwindCSS format - Label's font size
   * - e.g. text-base
   */
  labelFontSize: string;

  /** TailwindCSS format - Label's font family
   * - e.g. font-sans
   */
  labelFontFamily: string;

  /** TailwindCSS format - Label's line height
   * - e.g. leading-normal
   */
  labelLineHeight: string;

  /** TailwindCSS format
   * - Activate mean whether the input is being focused or the input field was answered
   * - Don't need to specific translate-x-, it's fixed value
   */
  labelActivateStyle?: string;

  /** TailwindCSS format
   * - Activate mean whether the input is being focused or the input field was answered
   * - Don't need to specific translate-x-, it's fixed value
   */
  labelDeActivateStyle?: string;

  /** TailwindCSS format - Description's font size
   * - e.g. text-base
   */
  descriptionFontSize: string;

  /** TailwindCSS format - Description's font family
   * - e.g. font-sans
   */
  descriptionFontFamily: string;

  /** TailwindCSS format - Description's text color
   * - e.g. text-instillGrey50
   */
  descriptionTextColor: string;

  /** TailwindCSS format - Description's line height
   * - e.g. leading-normal
   */
  descriptionLineHeight: string;

  /** TailwindCSS format - Description's font weight
   * - e.g. font-normal
   */
  descriptionFontWeight: string;
}

export type Nullable<T> = T | null;

export type State =
  | PipelineState
  | ConnectorState
  | ModelState
  | "STATE_LOADING";

export type PipelineState =
  | "STATE_UNSPECIFIED"
  | "STATE_ACTIVE"
  | "STATE_INACTIVE"
  | "STATE_ERROR";

export type ConnectorState =
  | "STATE_CONNECTED"
  | "STATE_DISCONNECTED"
  | "STATE_ERROR";

export type ModelState = "STATE_ONLINE" | "STATE_OFFLINE" | "STATE_ERROR";
