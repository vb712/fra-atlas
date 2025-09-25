import os
from datetime import datetime, date
from typing import Any, Dict, List
from flask import Flask, jsonify, request, send_from_directory, abort
from sqlalchemy import func, select
from sqlalchemy.orm import Session
from database import Claim, init_db, get_session

app = Flask(
    __name__,
    static_folder='.',
    static_url_path=''
)

# --------------------
# Demo/static data blocks
# --------------------
SEED_CLAIMS: List[Dict[str, Any]] = [
    {
        "id": "FRA2024001",
        "claimantName": "Ramesh Kumar",
        "location": "Jharkhand, Ranchi",
        "area": 2.5,
        "status": "Pending",
        "dateSubmitted": "2024-09-15",
        "remarks": "Documents under review",
    },
    {
        "id": "FRA2024002",
        "claimantName": "Sunita Devi",
        "location": "Odisha, Koraput",
        "area": 1.8,
        "status": "Approved",
        "dateSubmitted": "2024-09-10",
        "remarks": "All documents verified",
    },
    {
        "id": "FRA2024003",
        "claimantName": "Arjun Singh",
        "location": "Madhya Pradesh, Balaghat",
        "area": 3.2,
        "status": "Rejected",
        "dateSubmitted": "2024-09-08",
        "remarks": "Insufficient evidence",
    },
    {
        "id": "FRA2024004",
        "claimantName": "Meera Tribal",
        "location": "Chhattisgarh, Dantewada",
        "area": 1.9,
        "status": "Approved",
        "dateSubmitted": "2024-09-12",
        "remarks": "Community forest rights approved",
    },
    {
        "id": "FRA2024005",
        "claimantName": "Ravi Oraon",
        "location": "Jharkhand, Gumla",
        "area": 2.8,
        "status": "Pending",
        "dateSubmitted": "2024-09-14",
        "remarks": "Awaiting field verification",
    },
]

AI_INSIGHTS: List[Dict[str, Any]] = [
    {
        "type": "alert",
        "title": "Unusual Claim Pattern Detected",
        "description": "Multiple claims submitted from same GPS coordinates in Ranchi district",
        "severity": "high",
        "date": "2024-09-18",
    },
    {
        "type": "anomaly",
        "title": "Land Use Change Detected",
        "description": "Significant deforestation detected in protected area near Koraput",
        "severity": "medium",
        "date": "2024-09-17",
    },
    {
        "type": "prediction",
        "title": "Processing Time Prediction",
        "description": "Current pending claims likely to be processed within 45 days based on historical data",
        "severity": "low",
        "date": "2024-09-16",
    },
]

FAQ_DATA: List[Dict[str, Any]] = [
    {
        "category": "general",
        "question": "What is the Forest Rights Act (FRA)?",
        "answer": "The Forest Rights Act, 2006 recognizes and vests the forest rights and occupation in forest land in forest dwelling Scheduled Tribes and other traditional forest dwellers.",
    },
    {
        "category": "claims",
        "question": "How do I submit a claim?",
        "answer": "Claims must be submitted through the Gram Sabha with proper documentation including proof of residence and traditional forest dwelling.",
    },
    {
        "category": "technical",
        "question": "How is the data updated?",
        "answer": "The system is updated in real-time as claims are processed at district and state levels.",
    },
    {
        "category": "general",
        "question": "Who is eligible for forest rights?",
        "answer": "Scheduled Tribes and other traditional forest dwellers who have been residing in forest areas prior to December 13, 2005, are eligible for forest rights under the FRA.",
    },
    {
        "category": "claims",
        "question": "What documents are required for a claim?",
        "answer": "Required documents include proof of residence, voter ID, ration card, evidence of traditional occupation, and community verification from Gram Sabha.",
    },
    {
        "category": "technical",
        "question": "How accurate is the GPS mapping?",
        "answer": "Our GPS mapping uses satellite imagery with accuracy up to 1-meter resolution, updated quarterly through ISRO's remote sensing data.",
    },
]

TEAM_MEMBERS: List[Dict[str, Any]] = [
    {
        "name": "Dr. Priya Sharma",
        "role": "Project Director",
        "bio": "15+ years experience in forest policy and GIS mapping",
        "avatar": "👩‍💼",
    },
    {
        "name": "Rajesh Kumar",
        "role": "Technical Lead",
        "bio": "Expert in geospatial technologies and data visualization",
        "avatar": "👨‍💻",
    },
    {
        "name": "Anita Patel",
        "role": "Policy Advisor",
        "bio": "Former forest rights activist with deep community knowledge",
        "avatar": "👩‍🎓",
    },
]

# --------------------
# Helpers
# --------------------

def row_to_claim_obj(c: Claim) -> Dict[str, Any]:
    return {
        "id": c.id,
        "claimantName": c.claimant_name,
        "location": c.location,
        "area": c.area,
        "status": c.status,
        "dateSubmitted": c.date_submitted.isoformat() if isinstance(c.date_submitted, date) else str(c.date_submitted),
        "remarks": c.remarks,
    }


def get_stats_from_db(session: Session) -> Dict[str, Any]:
    total = session.execute(select(func.count(Claim.id))).scalar() or 0
    approved = session.execute(select(func.count(Claim.id)).where(Claim.status == 'Approved')).scalar() or 0
    pending = session.execute(select(func.count(Claim.id)).where(Claim.status == 'Pending')).scalar() or 0
    rejected = session.execute(select(func.count(Claim.id)).where(Claim.status == 'Rejected')).scalar() or 0
    return {
        "total": total,
        "approved": approved,
        "pending": pending,
        "rejected": rejected,
        "trends": {
            "totalChange": "+12%",
            "approvedChange": "+8%",
            "pendingChange": "-15%",
            "rejectedChange": "+3%",
        },
    }


def get_claims_by_state(session: Session) -> List[Dict[str, Any]]:
    rows = session.execute(select(Claim.location)).scalars().all()
    counts: Dict[str, int] = {}
    for loc in rows:
        loc = loc or ''
        state = loc.split(',')[0].strip() if loc else 'Unknown'
        if not state:
            state = 'Unknown'
        counts[state] = counts.get(state, 0) + 1
    return [{"state": k, "claims": v} for k, v in counts.items()]


def get_chart_data_from_db(session: Session) -> Dict[str, Any]:
    stats = get_stats_from_db(session)
    return {
        "claimsByStatus": [
            {"name": "Approved", "value": stats["approved"], "color": "#22c55e"},
            {"name": "Pending", "value": stats["pending"], "color": "#f59e0b"},
            {"name": "Rejected", "value": stats["rejected"], "color": "#ef4444"},
        ],
        # Demo time series; keep static
        "trendsOverTime": [
            {"month": "Jan", "approved": 650, "pending": 320, "rejected": 180},
            {"month": "Feb", "approved": 720, "pending": 290, "rejected": 165},
            {"month": "Mar", "approved": 890, "pending": 340, "rejected": 195},
            {"month": "Apr", "approved": 945, "pending": 380, "rejected": 220},
            {"month": "May", "approved": 1020, "pending": 420, "rejected": 210},
            {"month": "Jun", "approved": 1150, "pending": 390, "rejected": 240},
        ],
        "claimsByState": get_claims_by_state(session),
    }


def generate_next_claim_id(session: Session, date_submitted: date) -> str:
    year = date_submitted.year if isinstance(date_submitted, date) else datetime.utcnow().year
    prefix = f"FRA{year}"
    rows = session.execute(select(Claim.id).where(Claim.id.like(prefix + '%'))).scalars().all()
    max_seq = 0
    for cid in rows:
        s = cid[len(prefix):]
        try:
            n = int(s)
            if n > max_seq:
                max_seq = n
        except Exception:
            continue
    return f"{prefix}{max_seq + 1:04d}"


def seed_db() -> None:
    with get_session() as session:
        # if any rows exist, skip
        exists = session.execute(select(func.count(Claim.id))).scalar() or 0
        if exists > 0:
            return
        for c in SEED_CLAIMS:
            try:
                d = datetime.fromisoformat(c["dateSubmitted"]).date()
            except Exception:
                d = datetime.utcnow().date()
            session.add(Claim(
                id=c["id"],
                claimant_name=c["claimantName"],
                location=c["location"],
                area=float(c["area"]),
                status=c["status"],
                date_submitted=d,
                remarks=c.get("remarks", ""),
            ))
        session.commit()

# --------------------
# Routes - UI
# --------------------

@app.route('/')
def index():
    return send_from_directory('.', 'atlas.html')

# --------------------
# Routes - API
# --------------------

@app.route('/api/data', methods=['GET'])
def get_all_data():
    with get_session() as session:
        stats = get_stats_from_db(session)
        recent = session.execute(
            select(Claim).order_by(Claim.date_submitted.desc(), Claim.id.desc()).limit(50)
        ).scalars().all()
        chart_data = get_chart_data_from_db(session)
        return jsonify({
            "claimsStats": stats,
            "recentClaims": [row_to_claim_obj(r) for r in recent],
            "chartData": chart_data,
            "aiInsights": AI_INSIGHTS,
            "faqData": FAQ_DATA,
            "teamMembers": TEAM_MEMBERS,
        })

@app.route('/api/stats', methods=['GET'])
def api_stats():
    with get_session() as session:
        return jsonify(get_stats_from_db(session))

@app.route('/api/chart-data', methods=['GET'])
def api_chart_data():
    with get_session() as session:
        return jsonify(get_chart_data_from_db(session))

@app.route('/api/faq', methods=['GET'])
def api_faq():
    return jsonify(FAQ_DATA)

@app.route('/api/team', methods=['GET'])
def api_team():
    return jsonify(TEAM_MEMBERS)

# Claims listing with server-side filtering, sorting, pagination
@app.route('/api/claims', methods=['GET'])
def list_claims():
    q = request.args.get('q', '').strip()
    status = request.args.get('status', '').strip()
    location = request.args.get('location', '').strip()
    page = max(int(request.args.get('page', '1') or 1), 1)
    per_page = min(max(int(request.args.get('per_page', '10') or 10), 1), 100)

    sort_by = request.args.get('sort_by', 'id')
    order = request.args.get('order', 'asc').lower()

    sort_map = {
        'id': Claim.id,
        'claimantName': Claim.claimant_name,
        'location': Claim.location,
        'area': Claim.area,
        'status': Claim.status,
        'dateSubmitted': Claim.date_submitted,
    }
    sort_col = sort_map.get(sort_by, Claim.id)
    sort_expr = sort_col.desc() if order == 'desc' else sort_col.asc()

    with get_session() as session:
        stmt = select(Claim)
        if q:
            like = f"%{q.lower()}%"
            stmt = stmt.where(
                func.lower(Claim.claimant_name).like(like) | func.lower(Claim.id).like(like)
            )
        if status:
            stmt = stmt.where(Claim.status == status)
        if location:
            stmt = stmt.where(Claim.location.like(f"%{location}%"))

        total = session.execute(select(func.count()).select_from(stmt.subquery())).scalar() or 0

        items = session.execute(
            stmt.order_by(sort_expr).limit(per_page).offset((page - 1) * per_page)
        ).scalars().all()

        return jsonify({
            "items": [row_to_claim_obj(c) for c in items],
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": (total + per_page - 1) // per_page,
        })

@app.route('/api/claims/<claim_id>', methods=['GET'])
def get_claim(claim_id: str):
    with get_session() as session:
        c = session.get(Claim, claim_id)
        if not c:
            abort(404, description=f"Claim {claim_id} not found")
        return jsonify(row_to_claim_obj(c))

# Create claim
@app.route('/api/claims', methods=['POST'])
def create_claim():
    payload = request.get_json(silent=True) or {}
    claimant_name = payload.get('claimantName', '').strip()
    location = payload.get('location', '').strip()
    try:
        area = float(payload.get('area'))
    except Exception:
        abort(400, description='Invalid area')
    status = payload.get('status', '').strip() or 'Pending'
    date_submitted_str = payload.get('dateSubmitted') or datetime.utcnow().date().isoformat()
    remarks = (payload.get('remarks') or '').strip()

    if not claimant_name or not location:
        abort(400, description='Missing claimantName or location')

    try:
        date_submitted = datetime.fromisoformat(date_submitted_str).date()
    except Exception:
        date_submitted = datetime.utcnow().date()

    with get_session() as session:
        claim_id = (payload.get('id') or '').strip() or generate_next_claim_id(session, date_submitted)
        existing = session.get(Claim, claim_id)
        if existing:
            abort(409, description=f"Claim id {claim_id} already exists")
        c = Claim(
            id=claim_id,
            claimant_name=claimant_name,
            location=location,
            area=area,
            status=status,
            date_submitted=date_submitted,
            remarks=remarks,
        )
        session.add(c)
        session.commit()
        session.refresh(c)
        return jsonify(row_to_claim_obj(c)), 201

# Update claim
@app.route('/api/claims/<claim_id>', methods=['PUT'])
def update_claim(claim_id: str):
    payload = request.get_json(silent=True) or {}
    with get_session() as session:
        c = session.get(Claim, claim_id)
        if not c:
            abort(404, description=f"Claim {claim_id} not found")

        if 'claimantName' in payload and payload['claimantName'] is not None:
            c.claimant_name = str(payload['claimantName']).strip()
        if 'location' in payload and payload['location'] is not None:
            c.location = str(payload['location']).strip()
        if 'area' in payload and payload['area'] is not None:
            try:
                c.area = float(payload['area'])
            except Exception:
                abort(400, description='Invalid area')
        if 'status' in payload and payload['status'] is not None:
            c.status = str(payload['status']).strip()
        if 'dateSubmitted' in payload and payload['dateSubmitted'] is not None:
            try:
                c.date_submitted = datetime.fromisoformat(payload['dateSubmitted']).date()
            except Exception:
                pass
        if 'remarks' in payload and payload['remarks'] is not None:
            c.remarks = str(payload['remarks']).strip()

        session.commit()
        session.refresh(c)
        return jsonify(row_to_claim_obj(c))

# Delete claim
@app.route('/api/claims/<claim_id>', methods=['DELETE'])
def delete_claim(claim_id: str):
    with get_session() as session:
        c = session.get(Claim, claim_id)
        if not c:
            abort(404, description=f"Claim {claim_id} not found")
        session.delete(c)
        session.commit()
        return jsonify({"status": "deleted", "id": claim_id})

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    payload = request.get_json(silent=True) or {}
    return jsonify({"status": "ok", "message": "Thanks for reaching out!", "received": payload}), 201

# --------------------
# Startup -> THIS BLOCK WAS REMOVED
# --------------------

if __name__ == '__main__':
    init_db()
    seed_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
