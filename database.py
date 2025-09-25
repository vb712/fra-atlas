import os
from datetime import date
from sqlalchemy import create_engine, Column, String, Text, Float, Date, Index
from sqlalchemy.orm import declarative_base, sessionmaker

# DATABASE_URL should be set to something like:
#   postgresql+psycopg2://fra_user:fra_pass@localhost:5432/fra_atlas
# For immediate usability without Postgres, we fallback to SQLite if not provided.
DEFAULT_SQLITE_URL = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'fra.db')}"
DATABASE_URL = os.getenv('DATABASE_URL', DEFAULT_SQLITE_URL)

# Create SQLAlchemy engine and session factory
engine = create_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

Base = declarative_base()


class Claim(Base):
    __tablename__ = 'claims'

    id = Column(String(32), primary_key=True)
    claimant_name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    area = Column(Float, nullable=False)
    status = Column(String(50), nullable=False)
    date_submitted = Column(Date, nullable=False, default=date.today)
    remarks = Column(Text)


# Helpful indexes for filtering
Index('idx_claims_status', Claim.status)
Index('idx_claims_location', Claim.location)


def init_db():
    Base.metadata.create_all(bind=engine)


def get_session():
    """Return a new SQLAlchemy session. Caller must close() it."""
    return SessionLocal()
