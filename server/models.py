from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class UploadedFile(db.Model):
    __tablename__ = 'uploaded_files'

    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    

class TranscriptionResult(db.Model):
    __tablename__ = 'transcription_results'

    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.Integer, db.ForeignKey('uploaded_files.id'), nullable=False)
    transcription_text = db.Column(db.Text, nullable=False)

    uploaded_file = db.relationship('UploadedFile', backref='transcription_result', uselist=False)
