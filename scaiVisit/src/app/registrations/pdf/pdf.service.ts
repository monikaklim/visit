import { Injectable } from '@angular/core';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {
    this.createTable = this.createTable.bind(this);
  }

  makePdf(registrations) {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    let body =  [

    ];
    
    body.push([
      "Data",
      "Visitatore",
      "Azienda di appartenenza",
      "Orario di entrata",
      "Firma",
      "Orario di uscita",
      "Firma"
    ]);
   console.log(registrations)
   let docDefinition = {
      content: [
        {
        table: {
          widths: [70, 150, 100, 50, 140, 50, 140],
          body: body
        }
      }
      ],
      pageOrientation: 'landscape',
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        body: {
          fontSize: 14,
          bold: false,
          alignment: "justify",
          margin: [20, 0, 20, 15]
        }
      }
     
    }
    pdfmake.createPdf(docDefinition).open();
  }




















  creaPdf(azienda, referente, firma) {
    let firmaPdf = {};
    if (firma) {
      firmaPdf = {
        columns: [
          {
            image: firma,
            fit: [200, 200]
          }
        ],
        margin: [0, 0, 0, 0]
      };
    }
    const dd = {
      content: [
        {
          text:
            "Informativa per i visitatori\n ai sensi degli artt. 13 e ss. Reg. UE n. 679/2016 (GDPR)",
          style: "header"
        },
        {
          text: [
            "Con la presente Vi informiamo che, ai sensi e per gli effetti degli artt. 13 e ss. del Reg. UE 679/2016 (GDPR), i Vostri dati personali a noi conferiti e finalizzati unicamente al riconoscimento dei visitatori che hanno accesso a titolo temporaneo alla sede della Società per ragioni di sicurezza, saranno trattati in conformità alle normative vigenti."
          ],
          style: "body"
        },
        {
          text: [
            "Titolare del trattamento è SCAI S.p.A. in persona dell’amministratore delegato Massimiliano Cipolletta"
          ],
          style: "body"
        },
        {
          text: [
            { text: "Natura del conferimento dei dati. ", bold: true },
            "La comunicazione dei suoi dati personali è un obbligo legale cui il titolare deve adempiere ai sensi del d.lgs. 81/08 ed è di natura obbligatoria al fine di consentire l’accesso ai locali medesimi. Al rifiuto di comunicarli potrà conseguire il diniego di accesso."
          ],
          style: "body"
        },
        {
          text: [
            { text: "Natura dei dati trattati. ", bold: true },
            "Saranno trattati esclusivamente dati identificativi anagrafici, l’indicazione della società di appartenenza e l’orario di ingresso ed uscita presso lo stabile. Il transito nelle parti comuni è soggetto a videosorveglianza, esclusivamente per motivi di sicurezza."
          ],
          style: "body"
        },
        {
          text: [
            { text: "Modalità di trattamento. ", bold: true },
            "I dati verranno trattati in modo lecito, secondo correttezza e con la massima riservatezza, nel pieno rispetto dei principi generali di cui all’art. 5 del predetto Regolamento GDPR e potranno essere raccolti sia in formato elettronico che cartaceo."
          ],
          style: "body"
        },
        {
          text: [
            { text: "Periodo di conservazione dei dati. ", bold: true },
            "Tutti i dati predetti saranno archiviati e mantenuti esclusivamente per il tempo necessario allo svolgimento delle finalità di cui sopra."
          ],
          style: "body"
        },
        {
          text: [
            { text: "Diritti dell’Interessato. ", bold: true },
            "Agli interessati sono riconosciuti i diritti di cui agli articoli 15 e ss. del citato Regolamento ed in particolare l'accesso ai dati personali e la rettifica o la cancellazione degli stessi o la limitazione del trattamento dei dati personali che li riguardano, nonché di opporsi al loro trattamento, oltre al diritto alla portabilità dei dati. L’esercizio di tali diritti potrà essere esperito scrivendo a SCAI S.p.A., presso l’indirizzo mail privacy@holding.grupposcai.it."
          ],
          style: "body"
        },
        {
          text: [
            { text: "Reclamo. ", bold: true },
            "In ogni caso è fatto salvo il diritto dell’interessato di proporre, se ne sussistono i presupposti ed in caso di violazioni, reclamo all’Autorità di Controllo in materia di privacy."
          ],
          style: "body"
        },
        {
          text: [
            { text: "Data Protection Officer: ", bold: true },
            "Marco Zucchini – marco.zucchini@holding.grupposcai.it."
          ],
          style: "body"
        },
        {
          text: ["Firma"],
          style: "body",
          margin: [15, 20, 0, 0]
        },
        firmaPdf
      ],
      styles: {
        header: {
          font: "Garamond",
          fontSize: 14,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20]
        },
        body: {
          font: "Garamond",
          fontSize: 14,
          bold: false,
          alignment: "justify",
          margin: [20, 0, 20, 15]
        }
      }
    };
    return dd;
  }
  buildTableBody(data) {
    let body = [];
    body.push([
      "Data",
      "Visitatore",
      "Azienda di appartenenza",
      "Orario di entrata",
      "Firma",
      "Orario di uscita",
      "Firma"
    ]);
    data.forEach(function(row) {
      let dataRow = [];
      dataRow.push(row[0]["date"].toString());
      dataRow.push(
        row[0]["firstname"].toString() + " " + row[0]["lastaname"].toString()
      );
      dataRow.push(row[0]["company"].toString());
      dataRow.push(row[0]["time"].toString());
      dataRow.push(
        row[0]["firma"] ? { image: row[0]["firma"], fit: [100, 50] } : ""
      );
      dataRow.push(row[1] ? row[1]["time"].toString() : "");
      dataRow.push(
        row[1]
          ? row[1]["firma"]
            ? { image: row[1]["firma"], fit: [100, 50] }
            : ""
          : ""
      );
      body.push(dataRow);
    });

    return body;
  }
  createPdfFirme(data) {
    var dd = {
      pageOrientation: "landscape",
      content: [
        {
          style: "tableExample",
          table: {
            widths: [70, 150, 100, 50, 140, 50, 140],
            body: this.buildTableBody(data)
          }
        }
      ],
      styles: {
        header: {
          font: "Garamond",
          alignment: "center",
          fontSize: 18,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          font: "Garamond",
          alignment: "center",
          fontSize: 16,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          font: "Garamond",
          alignment: "center",
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          font: "Garamond",
          alignment: "center",
          fontSize: 13,
          color: "black"
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };
    return dd;
  }

  createTable(data, dd) {
    var azienda = {
      text: data.company
    };
    var table = {
      style: "tableExample",
      table: {
        widths: [70, 150, 100, 50, 140, 50, 140],
        body: this.buildTableBody(data.reduced)
      }
    };
    dd.content.push(azienda);
    dd.content.push(table);
  }
  createPdfFirmeAziende(data) {
    var dd = {
      pageOrientation: "landscape",
      content: [],
      styles: {
        header: {
          font: "Garamond",
          alignment: "center",
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          font: "Garamond",
          alignment: "center",
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          font: "Garamond",
          alignment: "center",
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          font: "Garamond",
          alignment: "center",
          bold: true,
          fontSize: 13,
          color: "black"
        }
      },
      defaultStyle: {
        font: "Garamond"
        // alignment: 'justify'
      }
    };

    data.map(table => {
      this.createTable(table, dd);
      var pageBreak = {
        text: "",
        pageBreak: "after"
      };
      dd.content.push(pageBreak);
    });
    dd.content.splice(-1, 1);

    return dd;
  }


}
