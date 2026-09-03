package com.jobfeel.careercompass.analysis.service;

import com.jobfeel.careercompass.analysis.domain.AnalysisReport;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * 외부 저장소 없이도 개발 E2E에서 실제 PDF 다운로드를 확인하기 위한 최소 PDF 생성기다.
 */
@Service
public class ReportPdfService {

    public byte[] createPdf(AnalysisReport report) {
        String content = "BT /F1 18 Tf 72 760 Td (Career Compass Report) Tj "
                + "0 -36 Td /F1 12 Tf (Report ID: " + report.getReportId() + ") Tj "
                + "0 -24 Td (Type: " + report.getReportType() + ") Tj "
                + "0 -24 Td (Status: " + report.getStatus() + ") Tj ET";

        List<String> objects = List.of(
                "<< /Type /Catalog /Pages 2 0 R >>",
                "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
                "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
                        + "/Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
                "<< /Length " + content.getBytes(StandardCharsets.US_ASCII).length + " >>\nstream\n"
                        + content + "\nendstream",
                "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
        );

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        write(output, "%PDF-1.4\n");
        List<Integer> offsets = new ArrayList<>();
        offsets.add(0);
        for (int index = 0; index < objects.size(); index++) {
            offsets.add(output.size());
            write(output, (index + 1) + " 0 obj\n" + objects.get(index) + "\nendobj\n");
        }

        int xrefOffset = output.size();
        write(output, "xref\n0 " + (objects.size() + 1) + "\n");
        write(output, "0000000000 65535 f \n");
        for (int index = 1; index < offsets.size(); index++) {
            write(output, String.format("%010d 00000 n \n", offsets.get(index)));
        }
        write(output, "trailer\n<< /Size " + (objects.size() + 1) + " /Root 1 0 R >>\n");
        write(output, "startxref\n" + xrefOffset + "\n%%EOF\n");
        return output.toByteArray();
    }

    private void write(ByteArrayOutputStream output, String value) {
        output.writeBytes(value.getBytes(StandardCharsets.US_ASCII));
    }
}
