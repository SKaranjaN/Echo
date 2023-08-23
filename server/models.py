from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Base(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UploadedFile(Base):
    __tablename__ = 'uploaded_files'

    file_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)

class TranscriptionResult(db.Model):
    __tablename__ = 'transcription_results'

    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.Integer, db.ForeignKey('uploaded_files.id'), nullable=False)
    transcription_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    uploaded_file = db.relationship('UploadedFile', backref='transcription_result', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'file_id': self.file_id,
            'transcription_text': self.transcription_text,
            'created_at': self.created_at
        }