from sqlalchemy import Column, Integer, String, Text

from database.database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    overall_score = Column(Integer)

    technical_score = Column(Integer)

    communication_score = Column(Integer)

    strengths = Column(Text)

    weaknesses = Column(Text)

    feedback = Column(Text)

    interview_date = Column(String)