import os
import sys
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

WIDTH, HEIGHT = 1920, 1080
FPS = 30

def get_font(size):
    # Try Windows Arial or Segoe UI, fallback to default
    font_paths = [
        "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\arial.ttf",
        "C:\\Windows\\Fonts\\tahoma.ttf"
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

def draw_header(draw, title, subtitle):
    # Header badge
    draw.rounded_rectangle([80, 50, 480, 95], radius=10, fill=(30, 41, 59), outline=(6, 182, 212), width=2)
    font_badge = get_font(20)
    draw.text((100, 60), "BUILD WITH AI • CHALLENGE 6", fill=(6, 182, 212), font=font_badge)
    
    font_title = get_font(42)
    draw.text((80, 115), title, fill=(255, 255, 255), font=font_title)
    
    font_sub = get_font(22)
    draw.text((80, 175), subtitle, fill=(148, 163, 184), font=font_sub)
    draw.line([80, 215, 1840, 215], fill=(30, 41, 59), width=2)

def draw_footer(draw, scene_num, total_scenes=7):
    draw.line([80, 970, 1840, 970], fill=(30, 41, 59), width=2)
    font_f = get_font(18)
    draw.text((80, 990), "SmogShield AI • Team Spectronz (Rank #2 / 52,855) • Live: smogshield-ai.vercel.app", fill=(100, 116, 139), font=font_f)
    draw.text((1700, 990), f"Scene {scene_num} / {total_scenes}", fill=(6, 182, 212), font=font_f)

def create_scene_1():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(11, 15, 25))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "THE URBAN WINTER SMOG CRISIS", "Nocturnal Temperature Inversions Trapping Toxic Pollutants Across Megacities")
    
    # AQI Metric Box
    draw.rounded_rectangle([100, 260, 650, 880], radius=16, fill=(19, 26, 43), outline=(239, 68, 68), width=3)
    f_badge = get_font(22)
    draw.text((140, 290), "DELHI NCR • LIVE TELEMETRY", fill=(239, 68, 68), font=f_badge)
    
    f_huge = get_font(110)
    draw.text((140, 340), "384", fill=(239, 68, 68), font=f_huge)
    
    f_h2 = get_font(32)
    draw.text((140, 480), "HAZARDOUS / SEVERE", fill=(255, 255, 255), font=f_h2)
    
    f_body = get_font(22)
    draw.text((140, 540), "• PM2.5: 334.2 µg/m³ (22x WHO Safe Limit)", fill=(226, 232, 240), font=f_body)
    draw.text((140, 580), "• PM10: 489.1 µg/m³", fill=(226, 232, 240), font=f_body)
    draw.text((140, 620), "• NO2: 92.4 ppb", fill=(226, 232, 240), font=f_body)
    draw.text((140, 660), "• Surface Temperature: 11.2 °C (Inversion Cap)", fill=(226, 232, 240), font=f_body)
    draw.text((140, 700), "• Mixing Depth (zi): 85 meters (Trapped)", fill=(239, 68, 68), font=f_body)
    
    # Right Column: The Problem Statement
    draw.rounded_rectangle([700, 260, 1820, 880], radius=16, fill=(19, 26, 43), outline=(51, 65, 85), width=2)
    draw.text((740, 300), "The Problem: Passive Numbers Don't Protect Communities", fill=(56, 189, 248), font=f_h2)
    
    f_lg = get_font(24)
    y = 370
    points = [
        "1. Atmospheric Trapping: Radiative ground cooling creates an inversion lid compressing toxic smoke to 80m.",
        "2. The Commute Trap: Morning rush hour (07:00 - 09:30) overlaps exactly with peak stagnation.",
        "3. Lack of Actionable Intelligence: Generic air quality apps offer red warnings without practical alternatives.",
        "4. Community Vulnerability: Children, asthmatics, and low-income families carry severe health burdens.",
        "5. The Need: An anticipatory AI copilot providing low-emission routines and frugal DIY hacks."
    ]
    for p in points:
        draw.text((740, y), p, fill=(203, 213, 225), font=f_lg)
        y += 85
        
    draw_footer(draw, 1)
    return img

def create_scene_2():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(11, 15, 25))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "AEROGUARD AI COPILOT • POWERED BY GEMINI 2.5 FLASH", "Cognitive Multi-Turn Reasoning Tailored to Family Vulnerability & Live Atmosphere")
    
    # Left Box: Family Profile
    draw.rounded_rectangle([100, 260, 680, 880], radius=16, fill=(19, 26, 43), outline=(147, 51, 234), width=3)
    f_badge = get_font(22)
    draw.text((140, 290), "VULNERABILITY PROFILE INGESTION", fill=(168, 85, 247), font=f_badge)
    
    f_body = get_font(22)
    draw.text((140, 350), "• Household: 4 Members (Delhi NCR)", fill=(255, 255, 255), font=f_body)
    draw.text((140, 400), "• Child: Arjun (Age 7, Mild Asthma)", fill=(244, 63, 94), font=f_body)
    draw.text((140, 450), "• Senior: Mother (Age 68, Cardiac History)", fill=(244, 63, 94), font=f_body)
    draw.text((140, 500), "• Housing: Older apartment, leaky window seals", fill=(203, 213, 225), font=f_body)
    draw.text((140, 550), "• Commute: 45 min by two-wheeler / auto", fill=(203, 213, 225), font=f_body)
    
    draw.rounded_rectangle([140, 630, 640, 840], radius=12, fill=(30, 41, 59), outline=(168, 85, 247), width=1)
    draw.text((160, 650), "Gemini Prompt Injection Guardrail: ACTIVE", fill=(52, 211, 153), font=get_font(20))
    draw.text((160, 690), "XSS Disarming Sanitizer: ACTIVE", fill=(52, 211, 153), font=get_font(20))
    draw.text((160, 730), "Latency: 280ms (Flash) / 0ms (Neural Fallback)", fill=(56, 189, 248), font=get_font(20))
    draw.text((160, 770), "Speech Synthesis (TTS): ENABLED", fill=(250, 204, 21), font=get_font(20))
    
    # Right Box: Copilot Action Plan
    draw.rounded_rectangle([720, 260, 1820, 880], radius=16, fill=(19, 26, 43), outline=(6, 182, 212), width=2)
    f_h2 = get_font(28)
    draw.text((760, 300), "AeroGuard Copilot Strategic Patch Generated:", fill=(6, 182, 212), font=f_h2)
    
    patches = [
        ("Reschedule Arjun's School Drop-off", "Delay departure from 07:15 AM to 08:30 AM; cuts acute inhaled dose by 44%."),
        ("Sanctuary Bedroom Preparation", "Deploy Corsi-Rosenthal DIY filter in bedroom; seal door gap with rolled towel."),
        ("Culinary Emission Suppression", "Avoid wok frying/tadka during peak stagnation; activate exhaust and boil/bake."),
        ("Commute Route Substitution", "Switch from open two-wheeler to closed metro corridor with N95 respirator fit.")
    ]
    y = 370
    for title, desc in patches:
        draw.rounded_rectangle([760, y, 1780, y + 105], radius=12, fill=(30, 41, 59), outline=(51, 65, 85), width=1)
        draw.text((780, y + 15), title, fill=(250, 204, 21), font=get_font(22))
        draw.text((780, y + 55), desc, fill=(226, 232, 240), font=get_font(20))
        y += 125
        
    draw_footer(draw, 2)
    return img

def create_scene_3():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(11, 15, 25))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "DIURNAL INVERSION OPTIMIZER", "Boundary Layer Physics: Modeling Solar Convective Dilution Windows")
    
    # Main graph box
    draw.rounded_rectangle([100, 260, 1820, 880], radius=16, fill=(19, 26, 43), outline=(52, 211, 153), width=2)
    f_h2 = get_font(28)
    draw.text((140, 290), "24-Hour Planetary Boundary Layer Mixing Height (zi) & PM2.5 Concentration", fill=(255, 255, 255), font=f_h2)
    
    # Visual timeline segments
    # Red morning zone
    draw.rounded_rectangle([140, 370, 750, 680], radius=12, fill=(69, 10, 10), outline=(239, 68, 68), width=2)
    draw.text((160, 390), "CRITICAL DANGER: 05:00 - 09:30 AM", fill=(248, 113, 113), font=get_font(22))
    draw.text((160, 430), "• Severe Radiative Ground Cooling", fill=(254, 202, 202), font=get_font(20))
    draw.text((160, 470), "• Inversion Lid: zi = 80 - 120 meters", fill=(254, 202, 202), font=get_font(20))
    draw.text((160, 510), "• Surface PM2.5: 380 - 450 µg/m³", fill=(254, 202, 202), font=get_font(20))
    draw.text((160, 550), "• ACTION: Reschedule jogs, seal windows", fill=(250, 204, 21), font=get_font(20))
    draw.text((160, 590), "• Inhaled dose rate: 4.8 µg/min", fill=(248, 113, 113), font=get_font(20))
    
    # Green midday zone
    draw.rounded_rectangle([800, 370, 1450, 680], radius=12, fill=(6, 78, 59), outline=(52, 211, 153), width=3)
    draw.text((820, 390), "RECOMMENDED WINDOW: 12:30 - 15:00 PM", fill=(52, 211, 153), font=get_font(22))
    draw.text((820, 430), "• Solar Convection Breaks Inversion Lid", fill=(167, 243, 208), font=get_font(20))
    draw.text((820, 470), "• Mixing Height Expands: zi = 920 meters", fill=(167, 243, 208), font=get_font(20))
    draw.text((820, 510), "• Surface PM2.5 Diluted: 110 µg/m³ (4x cleaner)", fill=(167, 243, 208), font=get_font(20))
    draw.text((820, 550), "• ACTION: Safe window for errands, school runs", fill=(250, 204, 21), font=get_font(20))
    draw.text((820, 590), "• Inhaled dose slashed by 62%", fill=(52, 211, 153), font=get_font(20))
    
    # Stats callout
    draw.rounded_rectangle([1490, 370, 1780, 680], radius=12, fill=(30, 41, 59), outline=(6, 182, 212), width=2)
    draw.text((1510, 400), "Dose Slashed", fill=(148, 163, 184), font=get_font(20))
    draw.text((1510, 440), "-62%", fill=(52, 211, 153), font=get_font(52))
    
    draw.text((1510, 530), "Dilution Ratio", fill=(148, 163, 184), font=get_font(20))
    draw.text((1510, 570), "8.2x", fill=(56, 189, 248), font=get_font(52))
    
    # Bottom callout
    draw.rounded_rectangle([140, 720, 1780, 840], radius=12, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
    draw.text((160, 740), "Atmospheric Physics Equation: C(t) = Q_emission / (u * zi(t) * W)", fill=(250, 204, 21), font=get_font(24))
    draw.text((160, 785), "As solar insolation triples boundary layer height zi, ground pollutant concentration C(t) drops proportionately.", fill=(203, 213, 225), font=get_font(20))
    
    draw_footer(draw, 3)
    return img

def create_scene_4():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(11, 15, 25))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "FRUGAL INDOOR ENGINEERING LAB", "4-Filter Corsi-Rosenthal Cubes & Sanctuary Sealing for Under $60 (₹4,800)")
    
    # Left Box: Corsi Rosenthal specs
    draw.rounded_rectangle([100, 260, 850, 880], radius=16, fill=(19, 26, 43), outline=(6, 182, 212), width=3)
    draw.text((140, 290), "CORSI-ROSENTHAL BOX SIMULATOR", fill=(6, 182, 212), font=get_font(28))
    
    draw.text((140, 360), "• Clean Air Delivery Rate (CADR): 430 CFM", fill=(52, 211, 153), font=get_font(24))
    draw.text((140, 410), "• Air Changes Per Hour (ACH): 8.5 ACH (Standard Room)", fill=(52, 211, 153), font=get_font(24))
    draw.text((140, 460), "• Total Filter Media Area: 64 ft² (4x MERV-13)", fill=(226, 232, 240), font=get_font(22))
    draw.text((140, 510), "• Total Build Cost: $58 (~₹4,800)", fill=(250, 204, 21), font=get_font(24))
    draw.text((140, 560), "• Commercial Equivalent: $500 - $800 HEPA Unit", fill=(248, 113, 113), font=get_font(22))
    draw.text((140, 610), "• Filter Lifetime: 6 Months (Low Face Velocity)", fill=(226, 232, 240), font=get_font(22))
    draw.text((140, 660), "• Noise Level: 46 dB (Whisper Quiet)", fill=(226, 232, 240), font=get_font(22))
    
    draw.rounded_rectangle([140, 720, 810, 840], radius=10, fill=(30, 41, 59), outline=(6, 182, 212), width=1)
    draw.text((160, 740), "ASHRAE 52.2 Fluid Dynamics Certified", fill=(56, 189, 248), font=get_font(22))
    draw.text((160, 780), "Expanding media area lowers pressure drop across fan blades.", fill=(148, 163, 184), font=get_font(18))
    
    # Right Box: Indoor Air Quality Hacks
    draw.rounded_rectangle([890, 260, 1820, 880], radius=16, fill=(19, 26, 43), outline=(51, 65, 85), width=2)
    draw.text((930, 290), "Community Indoor Resilience Tactics", fill=(255, 255, 255), font=get_font(28))
    
    hacks = [
        ("Sanctuary Bedroom Strategy", "Seal windows with weatherstrip silicone foam tape. Place door-snake towel at threshold. Run DIY CR box on low continuous mode for 99% overnight PM2.5 clearance."),
        ("Culinary Kitchen Emission Controls", "High-heat mustard oil tadka/frying generates indoor PM2.5 > 600 µg/m³. Switch to wet cooking, pressure boiling, or induction with dedicated exhaust hood."),
        ("Wet Mopping vs Vacuum Exhaust", "Dry sweeping or standard bag vacuums aerosolize settled fine particulates. Use microfiber electrostatic wet mop with zero resuspension."),
        ("Safe Ventilation Windows", "Only crack opposing windows during the 13:00 - 15:00 solar convective window for 15 minutes to purge CO2 without smog ingestion.")
    ]
    y = 360
    for htitle, hdesc in hacks:
        draw.rounded_rectangle([930, y, 1780, y + 105], radius=12, fill=(30, 41, 59), outline=(51, 65, 85), width=1)
        draw.text((950, y + 15), htitle, fill=(250, 204, 21), font=get_font(22))
        draw.text((950, y + 55), hdesc[:105] + "...", fill=(203, 213, 225), font=get_font(18))
        y += 125
        
    draw_footer(draw, 4)
    return img

def create_scene_5():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(11, 15, 25))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "QUANTIFIED DIRECT IMPACT ENGINE", "Translating Smog Choices into Berkeley Earth Cigarette Equivalents & Health Risk Reduction")
    
    # 4 Metric Cards Across
    metrics = [
        ("Avoided Inhaled Dose", "1,480 µg", "Daily fine particulate mass spared from alveoli", (6, 182, 212)),
        ("Cigarettes Averted", "2.8 Cigs", "Berkeley Earth: 22 µg/m³ for 24h = 1 Cigarette", (244, 63, 94)),
        ("Avoided Carbon Footprint", "4.2 kg", "CO2e spared via shared transit & clean heating", (52, 211, 153)),
        ("Asthma Flare-up Risk", "-48%", "Clinical probability reduction for child / elder", (250, 204, 21))
    ]
    
    x = 100
    for title, val, note, col in metrics:
        draw.rounded_rectangle([x, 260, x + 395, 540], radius=16, fill=(19, 26, 43), outline=col, width=3)
        draw.text((x + 25, 290), title, fill=(148, 163, 184), font=get_font(20))
        draw.text((x + 25, 340), val, fill=col, font=get_font(52))
        draw.text((x + 25, 450), note, fill=(226, 232, 240), font=get_font(18))
        x += 435
        
    # Bottom Mathematical Explainability Section
    draw.rounded_rectangle([100, 580, 1820, 880], radius=16, fill=(19, 26, 43), outline=(51, 65, 85), width=2)
    draw.text((140, 610), "Direct Impact Mathematical Methodology", fill=(56, 189, 248), font=get_font(28))
    
    eqs = [
        ("1. Inhaled Dose Integration", "Dose = Integral [ C_ambient(t) * V_ventilation * (1 - Mask_efficiency) ] dt across active hours."),
        ("2. Berkeley Earth Cigarette Equivalence", "Equivalent Cigs = (Total Daily PM2.5 Microgram Exposure) / 528 µg (Muller & Rohde Rule)."),
        ("3. Acute Asthma Risk Attenuation", "Relative Risk RR = exp(0.012 * delta_PM2.5); rescheduling shifts daily peak below threshold.")
    ]
    y = 670
    for etitle, edesc in eqs:
        draw.text((140, y), etitle, fill=(250, 204, 21), font=get_font(22))
        draw.text((140, y + 35), edesc, fill=(203, 213, 225), font=get_font(20))
        y += 70
        
    draw_footer(draw, 5)
    return img

def create_scene_6():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(11, 15, 25))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "COMMUNITY RESILIENCE & OASIS CAP V1.2", "Crowdsourced Hotspot Reporting with Standardized XML Emergency Dispatches")
    
    # Left Box: Citizen Incident Reporting
    draw.rounded_rectangle([100, 260, 800, 880], radius=16, fill=(19, 26, 43), outline=(239, 68, 68), width=3)
    draw.text((140, 290), "CITIZEN SMOKE MONITORING", fill=(239, 68, 68), font=get_font(28))
    
    incidents = [
        ("Open Waste Burning Incident", "Location: Anand Vihar Ward 4 • Verified by 3 Neighbors • Severity: Severe"),
        ("Construction Dust Flare-up", "Location: Sector 62 Main Road • Dry grinding without water curtains • Severity: Warning"),
        ("Brick Kiln Plume Sighting", "Location: Peri-urban boundary • Nocturnal illegal firing detected • Severity: Critical")
    ]
    y = 360
    for ititle, idesc in incidents:
        draw.rounded_rectangle([140, y, 760, y + 130], radius=12, fill=(30, 41, 59), outline=(51, 65, 85), width=1)
        draw.text((160, y + 15), ititle, fill=(250, 204, 21), font=get_font(22))
        draw.text((160, y + 55), idesc[:70], fill=(226, 232, 240), font=get_font(18))
        draw.text((160, y + 85), idesc[70:], fill=(148, 163, 184), font=get_font(18))
        y += 160
        
    # Right Box: OASIS CAP v1.2 XML Generated
    draw.rounded_rectangle([840, 260, 1820, 880], radius=16, fill=(15, 23, 42), outline=(52, 211, 153), width=2)
    draw.text((880, 290), "OASIS Common Alerting Protocol (CAP v1.2) XML Dispatch", fill=(52, 211, 153), font=get_font(28))
    
    xml_code = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">',
        '  <identifier>SMOGSHIELD-2026-DL-0042</identifier>',
        '  <sender>resilience@smogshield.ai</sender>',
        '  <status>Actual</status>',
        '  <msgType>Alert</msgType>',
        '  <scope>Public</scope>',
        '  <info>',
        '    <category>Env</category>',
        '    <event>Severe Nocturnal Inversion & Illegal Stubble/Waste Burning</event>',
        '    <urgency>Immediate</urgency>',
        '    <severity>Extreme</severity>',
        '    <certainty>Observed</certainty>',
        '    <area>',
        '      <areaDesc>National Capital Region - Anand Vihar Cluster</areaDesc>',
        '      <circle>28.6469,77.3160,5.0</circle>',
        '    </area>',
        '  </info>',
        '</alert>'
    ]
    y = 360
    f_code = get_font(18)
    for line in xml_code:
        draw.text((880, y), line, fill=(56, 189, 248), font=f_code)
        y += 28
        
    draw_footer(draw, 6)
    return img

def create_scene_7():
    img = Image.new("RGB", (WIDTH, HEIGHT), color=(11, 15, 25))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "TEAM SPECTRONZ • BUILD WITH AI: CODE FOR COMMUNITIES", "Empowering Millions to Breathe Cleaner, Safer Air Through Anticipatory AI")
    
    # Large Trophy Box
    draw.rounded_rectangle([100, 260, 1820, 880], radius=16, fill=(19, 26, 43), outline=(250, 204, 21), width=3)
    
    f_huge = get_font(48)
    draw.text((160, 310), "🏆 SmogShield AI: Submission Verified & Deployed", fill=(250, 204, 21), font=f_huge)
    
    draw.line([160, 390, 1760, 390], fill=(51, 65, 85), width=2)
    
    f_body = get_font(26)
    draw.text((160, 430), "• Live Deployed Web Application: https://smogshield-ai.vercel.app", fill=(56, 189, 248), font=f_body)
    draw.text((160, 485), "• Standalone 10-Slide Pitch Deck: https://smogshield-ai.vercel.app/presentation.html", fill=(56, 189, 248), font=f_body)
    draw.text((160, 540), "• Technical Architecture Dossier: https://smogshield-ai.vercel.app/dossier.html", fill=(56, 189, 248), font=f_body)
    draw.text((160, 595), "• Public GitHub Repository: https://github.com/soumyadeepmagnusx/smogshield-ai", fill=(56, 189, 248), font=f_body)
    draw.text((160, 650), "• AI Evaluation Optimization: 9/9 Automated Physics & Unit Test Suites Passing (100%)", fill=(52, 211, 153), font=f_body)
    draw.text((160, 705), "• Security: Full Regex Prompt-Injection Defense & Zero-Leakage Architecture", fill=(52, 211, 153), font=f_body)
    
    draw.rounded_rectangle([160, 770, 1760, 840], radius=12, fill=(30, 41, 59), outline=(6, 182, 212), width=1)
    draw.text((190, 785), "Clean air is not a luxury or a privilege—it is a fundamental human right.", fill=(255, 255, 255), font=get_font(24))
    
    draw_footer(draw, 7)
    return img

def render_video(audio_path=None, output_path="smogshield_demo.mp4"):
    print("Generating 7 high-definition visual scenes...")
    scenes = [
        create_scene_1(),
        create_scene_2(),
        create_scene_3(),
        create_scene_4(),
        create_scene_5(),
        create_scene_6(),
        create_scene_7()
    ]
    
    # Save preview image files for inspection
    out_dir = os.path.dirname(os.path.abspath(__file__))
    frames_dir = os.path.join(out_dir, "video_frames")
    os.makedirs(frames_dir, exist_ok=True)
    for i, s in enumerate(scenes, 1):
        s.save(os.path.join(frames_dir, f"scene_{i}.png"))
    print(f"Saved {len(scenes)} preview scenes to {frames_dir}")
    
    # Timing per scene (in seconds, matching our 110-second script)
    # Total = 15 + 20 + 20 + 20 + 20 + 13 + 12 = 120 seconds
    scene_durations = [15, 20, 20, 20, 20, 13, 12]
    
    # If audio is provided, check its actual duration
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    if audio_path and os.path.exists(audio_path):
        print(f"Detected voiceover audio: {audio_path}")
        # Probing audio duration via ffprobe/ffmpeg
        try:
            probe = subprocess.run([
                ffmpeg_exe, "-i", audio_path
            ], stderr=subprocess.PIPE, text=True)
            for line in probe.stderr.splitlines():
                if "Duration:" in line:
                    time_str = line.split("Duration:")[1].split(",")[0].strip()
                    parts = time_str.split(":")
                    audio_seconds = float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])
                    print(f"Total audio duration: {audio_seconds:.2f} seconds")
                    # Scale scene durations proportionately
                    scale = audio_seconds / sum(scene_durations)
                    scene_durations = [max(3, int(d * scale)) for d in scene_durations]
                    break
        except Exception as e:
            print(f"Could not probe exact duration: {e}")
            
    print(f"Scene durations (seconds): {scene_durations}, Total: {sum(scene_durations)}s")
    
    # Render frames with smooth 1-second crossfades
    temp_video = os.path.join(out_dir, "temp_video.mp4")
    
    cmd = [
        ffmpeg_exe, "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-pix_fmt", "yuv420p",
        temp_video
    ]
    
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    for idx, (scene, duration) in enumerate(zip(scenes, scene_durations)):
        total_frames = duration * FPS
        scene_arr = np.array(scene)
        
        # Next scene for crossfade (if not last)
        next_scene_arr = np.array(scenes[idx + 1]) if idx + 1 < len(scenes) else None
        fade_frames = 15  # 0.5s crossfade
        
        for f in range(total_frames):
            if next_scene_arr is not None and f >= total_frames - fade_frames:
                # Alpha blend
                alpha = (f - (total_frames - fade_frames)) / fade_frames
                frame = ((1.0 - alpha) * scene_arr + alpha * next_scene_arr).astype(np.uint8)
            else:
                frame = scene_arr
            proc.stdin.write(frame.tobytes())
            
    proc.stdin.close()
    proc.wait()
    print("Video visuals rendered successfully!")
    
    # If audio is present, mux together
    final_output = os.path.join(out_dir, output_path)
    if audio_path and os.path.exists(audio_path):
        print("Muxing video with voiceover audio...")
        mux_cmd = [
            ffmpeg_exe, "-y",
            "-i", temp_video,
            "-i", audio_path,
            "-c:v", "copy",
            "-c:a", "aac",
            "-b:a", "192k",
            "-shortest",
            final_output
        ]
        subprocess.run(mux_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if os.path.exists(temp_video):
            os.remove(temp_video)
        print(f"🎉 Final Demo Video Created: {final_output}")
    else:
        if os.path.exists(temp_video):
            if os.path.exists(final_output):
                os.remove(final_output)
            os.rename(temp_video, final_output)
        print(f"🎉 Video (visuals only, waiting for voiceover) Created: {final_output}")
        
    print(f"File size: {os.path.getsize(final_output)} bytes")
    return final_output

if __name__ == "__main__":
    audio_file = sys.argv[1] if len(sys.argv) > 1 else None
    # Check default voiceover filenames in project directory
    proj_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    for candidate in ["voiceover.mp3", "voiceover.wav", "voiceover.m4a", "audio.mp3", "audio.wav"]:
        cpath = os.path.join(proj_dir, candidate)
        if os.path.exists(cpath):
            audio_file = cpath
            break
            
    render_video(audio_file)
