import { legendClasses } from "@mui/x-charts/ChartsLegend";
import { PieChart } from "@mui/x-charts/PieChart";

export function FPieChart() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 20, label: "Fundos de investimento" },
            { id: 1, value: 20, label: "Tesouro Direto" },
            { id: 2, value: 30, label: "Previdência Privada" },
            { id: 3, value: 30, label: "Bolsa de Valores" },
          ],
        },
      ]}
      height={200}
      slotProps={{
        legend: {
          position: {
            vertical: "middle",
            horizontal: "start",
          },
          sx: {
            fontSize: 16,
            color: "#fff",
            gap: "24px",
            [`.${legendClasses.mark}`]: {
              height: 20,
              width: 20,
            },
          },
        },
      }}
    />
  );
}
