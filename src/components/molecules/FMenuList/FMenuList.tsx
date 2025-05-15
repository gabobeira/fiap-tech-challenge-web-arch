import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  MenuListProps,
  Typography,
  useTheme,
} from "@mui/material";

export type FMenuListItem<T> = {
  label: string;
  path: string;
  view: T;
  current?: boolean;
};

type MenuVariant = "column" | "row";

interface FMenuListProps<T> {
  options?: MenuListProps;
  variant?: MenuVariant;
  menuItems: FMenuListItem<T>[];
  itemClick: (path: T) => void;
}

export function FMenuList<T>({
  options,
  variant = "column",
  menuItems,
  itemClick,
}: FMenuListProps<T>) {
  const isDarkTheme = useTheme().palette.mode === "dark";

  return (
    <MenuList {...options}>
      {menuItems.map(({ label, current, view }, index) => (
        <Box key={`menu-item-${index}`}>
          <MenuItem
            key={`menu-item-${index}`}
            sx={{ justifyContent: "center" }}
            onClick={() => itemClick(view)}
          >
            <Typography
              style={{
                color: current
                  ? "var(--mui-palette-tertiary-main)"
                  : isDarkTheme
                    ? "var(--mui-palette-primary-main)"
                    : "currentColor",
                fontWeight: variant === "row" ? 600 : current ? 700 : 400,
                textDecoration: "none",
                textTransform: "capitalize",
              }}
            >
              {label}
            </Typography>
          </MenuItem>
          <Divider
            sx={{
              display: variant === "row" ? "none" : "inherit",
              borderColor: current
                ? "var(--mui-palette-tertiary-main)"
                : "auto",
            }}
          />
        </Box>
      ))}
    </MenuList>
  );
}
