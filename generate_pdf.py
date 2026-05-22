import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.units import inch

def create_pdf():
    # Make sure output directory exists
    os.makedirs("public/files", exist_ok=True)
    pdf_path = "public/files/etudier-en-italie.pdf"
    
    # Page setup - 0.75 in (54 pt) margins
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#004A99")   # Lingua Blue
    secondary_color = colors.HexColor("#E31E24") # Lingua Red
    accent_green = colors.HexColor("#006837")    # Lingua Green
    dark_neutral = colors.HexColor("#1A1A1A")    # Charcoal
    light_bg = colors.HexColor("#F8F9FA")        # Light gray
    
    # Base paragraph styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=6,
        alignment=1 # Centered
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=secondary_color,
        spaceAfter=20,
        alignment=1 # Centered
    )
    
    h2_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=primary_color,
        spaceBefore=12,
        spaceAfter=8,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=15,
        textColor=dark_neutral,
        spaceAfter=8
    )
    
    body_bold = ParagraphStyle(
        'BodyBoldCustom',
        parent=body_style,
        fontName='Helvetica-Bold'
    )
    
    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=12,
        leading=16,
        textColor=accent_green,
        alignment=1,
        spaceAfter=15
    )
    
    story = []
    
    # --- HEADER / BRANDING ---
    story.append(Paragraph("LINGUA INTERNATIONAL ACADEMY", title_style))
    story.append(Paragraph("PROGRAMME D'ÉTUDES & D'ACCOMPAGNEMENT : ITALIE", subtitle_style))
    story.append(Spacer(1, 10))
    
    # --- KEY PROMISE CALLOUT ---
    callout_text = (
        "<b>Cours de langue + un accompagnement complet pour votre procédure.</b><br/>"
        "Nous facilitons le dépôt de la caution bancaire et les démarches administratives."
    )
    
    # Table layout for callout box
    callout_data = [[Paragraph(callout_text, callout_style)]]
    callout_table = Table(callout_data, colWidths=[doc.width])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, primary_color),
        ('TOPPADDING', (0,0), (-1,-1), 15),
        ('BOTTOMPADDING', (0,0), (-1,-1), 15),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('RIGHTPADDING', (0,0), (-1,-1), 20),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(callout_table)
    story.append(Spacer(1, 20))
    
    # --- SECTION: SERVICES ---
    story.append(Paragraph("Nos Services & Solutions Clés", h2_style))
    
    # We will build a structured two-column grid using reportlab tables for a neat look
    services = [
        ("1. Cours de Langue Italienne (A1 à B2)", 
         "Nous proposons des cours d'italien intensifs dispensés par des professionnels expérimentés, vous préparant aux certifications officielles indispensables pour l'admission dans les universités italiennes."),
        
        ("2. Facilité de Caution Bancaire", 
         "Le dépôt de la caution bancaire (compte bloqué) est une étape cruciale pour le visa étudiant. Notre académie vous propose des solutions fiables et simplifiées pour sécuriser cette étape financière."),
        
        ("3. Accompagnement Administratif Global", 
         "De la pré-inscription sur la plateforme Universitaly à la demande de visa consulaire, en passant par la traduction légalisée de vos diplômes, nous gérons votre dossier avec précision pour maximiser vos chances d'obtention de visa."),
        
        ("4. Intégration en Italie", 
         "Une fois sur place, nous restons à vos côtés pour vous assister dans vos démarches d'installation : demande de permis de séjour (Permesso di soggiorno), assurance santé et recherche de logement.")
    ]
    
    for title, desc in services:
        service_text = f"<b>{title}</b><br/>{desc}"
        story.append(Paragraph(service_text, body_style))
        story.append(Spacer(1, 5))
        
    story.append(Spacer(1, 15))
    
    # --- CTA / FUTURE ---
    future_text = "<b>Votre avenir en Italie commence ici.</b> Découvrez nos programmes dès aujourd’hui !"
    story.append(Paragraph(future_text, ParagraphStyle('CenterText', parent=body_style, alignment=1, fontSize=11, textColor=primary_color)))
    story.append(Spacer(1, 15))
    
    # --- CONTACT BOARD ---
    contact_header_style = ParagraphStyle(
        'ContactHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.white,
        alignment=1
    )
    contact_body_style = ParagraphStyle(
        'ContactBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.white,
        alignment=1
    )
    
    contact_data = [
        [Paragraph("SERVICE CLIENT / INFOLINE", contact_header_style)],
        [Paragraph("<b>Téléphone (Cameroun) :</b> 00237 677 467 766<br/><b>Téléphone (Italie / WhatsApp) :</b> 0039 329 659 8964", contact_body_style)],
        [Paragraph("<b>Site Internet Officiel :</b> <font color='#FFFFFF'><u>www.linguainternationalacademytraining.com</u></font>", contact_body_style)]
    ]
    
    contact_table = Table(contact_data, colWidths=[doc.width])
    contact_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), primary_color),
        ('BOX', (0,0), (-1,-1), 1.5, secondary_color),
        ('TOPPADDING', (0,0), (0,0), 8),
        ('BOTTOMPADDING', (0,0), (0,0), 4),
        ('TOPPADDING', (0,1), (-1,-1), 4),
        ('BOTTOMPADDING', (0,-1), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 15),
        ('RIGHTPADDING', (0,0), (-1,-1), 15),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    
    story.append(contact_table)
    
    # Build the document
    doc.build(story)
    print(f"PDF successfully created at {pdf_path}")

if __name__ == "__main__":
    create_pdf()
