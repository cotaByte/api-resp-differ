export interface NavItem {
  icon: string;
  label: string;
  route?: string;
  action?: () => void;
}
