import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Registrar fuentes
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2",
      fontWeight: 700,
    },
  ],
});

// Estilos del PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0891b2",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 20,
  },
  amountInfo: {
    backgroundColor: "#f0f9ff",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  amountText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0891b2",
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#0891b2",
  },
  tableHeaderCell: {
    margin: "auto",
    padding: 8,
    fontSize: 10,
    fontWeight: 700,
    color: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d5db",
    textAlign: "center",
    flex: 1,
  },
  tableCell: {
    margin: "auto",
    padding: 8,
    fontSize: 9,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d5db",
    textAlign: "center",
    flex: 1,
  },
  tableCellBold: {
    margin: "auto",
    padding: 8,
    fontSize: 9,
    fontWeight: 700,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d5db",
    textAlign: "center",
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  note: {
    backgroundColor: "#fef3c7",
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#92400e",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 10,
    color: "#92400e",
    lineHeight: 1.4,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    borderTopStyle: "solid",
  },
  footerText: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 1.4,
  },
});

const ArbitrationPDFDocument = ({ result }) => {
  const formatCurrency = (amount) => {
    return `S/${amount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}`;
  };

  const currentDate = new Date().toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>MCH ABOGADOS S.A.C.</Text>
          <Text style={styles.title}>Cotización de Costos Arbitrales</Text>
          <Text style={styles.subtitle}>Fecha: {currentDate}</Text>
        </View>

        {/* Amount Information */}
        <View style={styles.amountInfo}>
          <Text style={styles.amountText}>
            Monto de la Cuantía: {formatCurrency(result.amount)}
          </Text>
          <Text style={[styles.amountText, { fontSize: 12, marginTop: 5 }]}>
            Tipo:{" "}
            {result.arbitrationType === "tribunal"
              ? "Tribunal Arbitral"
              : "Árbitro Único"}
          </Text>
        </View>

        {/* Results Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderCell}>El nombre del servicio</Text>
            <Text style={styles.tableHeaderCell}>El costo del servicio</Text>
            <Text style={styles.tableHeaderCell}>IGV (18%)</Text>
            <Text style={styles.tableHeaderCell}>Renta (8%)</Text>
            <Text style={styles.tableHeaderCell}>Total con IGV</Text>
            <Text style={styles.tableHeaderCell}>Total con Renta</Text>
          </View>

          {/* Presentation Fee Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Tasa de presentación</Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.presentationFee)}
            </Text>
            <Text style={styles.tableCell}>Incluido</Text>
            <Text style={styles.tableCell}>-</Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.presentationFee)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.presentationFee)}
            </Text>
          </View>

          {/* Administrative Fee Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              Servicio de Administración de Arbitraje
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.administrativeFee)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.administrativeFee * 0.18)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.administrativeFee * 0.08)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.administrativeFee * 1.18)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.administrativeFee * 1.08)}
            </Text>
          </View>

          {/* Arbitrator Fee Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>
              Honorarios{" "}
              {result.arbitrationType === "tribunal"
                ? "Tribunal Arbitral"
                : "Árbitro Único"}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.arbitratorFee)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.arbitratorFee * 0.18)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.arbitratorFee * 0.08)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.arbitratorFee * 1.18)}
            </Text>
            <Text style={styles.tableCell}>
              {formatCurrency(result.arbitratorFee * 1.08)}
            </Text>
          </View>

          {/* Total Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellBold}>TOTAL</Text>
            <Text style={styles.tableCellBold}>
              {formatCurrency(result.subtotal)}
            </Text>
            <Text style={styles.tableCellBold}>
              {formatCurrency(result.igv)}
            </Text>
            <Text style={styles.tableCellBold}>
              {formatCurrency(result.renta)}
            </Text>
            <Text style={styles.tableCellBold}>
              {formatCurrency(result.totalWithIGV)}
            </Text>
            <Text style={styles.tableCellBold}>
              {formatCurrency(result.totalWithRenta)}
            </Text>
          </View>
        </View>

        {/* Important Note */}
        <View style={styles.note}>
          <Text style={styles.noteTitle}>Cada Parte Deberá Asumir El 50%</Text>
          <Text style={styles.noteText}>
            Con relación a los honorarios de los árbitros y el servicio de
            administración de arbitraje, cada parte deberá asumir el 50% de los
            costos arbitrales.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Esta cotización es referencial y puede variar según las
            circunstancias específicas del caso.
          </Text>
          <Text style={[styles.footerText, { marginTop: 10 }]}>
            MCH ABOGADOS S.A.C. - Centro de Arbitraje y Asesoría Legal
          </Text>
          <Text style={[styles.footerText, { marginTop: 5 }]}>
            Documento generado el {currentDate}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ArbitrationPDFDocument;
