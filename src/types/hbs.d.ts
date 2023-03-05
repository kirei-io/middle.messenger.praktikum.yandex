declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars/runtime";
  const delegate: TemplateDelegate;
  export default delegate;
}
