from flask import Flask, jsonify, make_response, request, render_template
from flask_restful import Api, Resource
from flask_cors import CORS
import whisper
from config import Config
from models import db, UploadedFile, TranscriptionResult  
from dotenv import load_dotenv
load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
app.config.from_object(Config)
api = Api(app)
CORS(app)

db.init_app(app)

# class Index(Resource):
#     def get(self):
#         response_dict = {
#             "message": "Karibu sana"
#         }
#         response = make_response(
#             response_dict,
#             200
#         )
#         return response
@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")


class UploadedFiles(Resource):
    def get(self):
        uploads = [upload.to_dict() for upload in UploadedFile.query.all()]
        response = make_response(jsonify(uploads), 200)
        return response

    def post(self):
        data = request.get_json()

        new_upload = UploadedFile(
            file_name=data['file_name'],
            file_path=data['file_path']
        )

        db.session.add(new_upload)
        db.session.commit()

        model = whisper.load_model("base")
        options = whisper.DecodingOptions(fp16=False)
        result = model.transcribe(data['file_path'])
        transcription_text = result["text"]

        new_transcription = TranscriptionResult(
            file_id=new_upload.id,
            transcription_text=transcription_text
        )
        
        db.session.add(new_transcription)
        db.session.commit()

        response_dict = new_transcription.to_dict()
        response = make_response(jsonify(response_dict), 201)
        return response
    
class Upload_by_Id(Resource):
    def get(self, id):
        response_dict = UploadedFile.query.filter_by(id=id).first().to_dict()
        response = make_response(response_dict, 200)
        return response

    def patch(self, id):
        updated_one = UploadedFile.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(updated_one, attr, request.form[attr])

        db.session.add(updated_one)
        db.session.commit()

        response_dict = updated_one.to_dict()
        response = make_response(response_dict, 200)
        return response

    def delete(self, id):
        selected_one = UploadedFile.query.filter_by(id=id).first()
        db.session.delete(selected_one)
        db.session.commit()

        response_dict = {"message": "Delete successfull"}
        response = make_response(
            jsonify(response_dict),
            200
        )
        return response


class TranscriptionResults(Resource):
    def get(self):
        transcriptions = [transcription.to_dict() for transcription in TranscriptionResult.query.all()]
        response = make_response(
            jsonify(transcriptions),
            200
        )
        return response

    def post(self):
        data = request.get_json()

        new_transcription = TranscriptionResult(
            transcription_text=data['transcription_text']
        )

        db.session.add(new_transcription)
        db.session.commit()

        response_dict = new_transcription.to_dict()
        response = make_response(jsonify(response_dict), 201)
        return response


class Transcription_by_Id(Resource):
    def get(self, id):
        response_dict = TranscriptionResult.query.filter_by(id=id).first().to_dict()
        response = make_response(response_dict, 200)
        return response

    def patch(self, id):
        updated_one = TranscriptionResult.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(updated_one, attr, request.form[attr])

        db.session.add(updated_one)
        db.session.commit()

        response_dict = updated_one.to_dict()
        response = make_response(response_dict, 200)
        return response

    def delete(self, id):
        selected_one = TranscriptionResult.query.filter_by(id=id).first()
        db.session.delete(selected_one)
        db.session.commit()

        response_dict = {"message": "Delete successfull"}
        response = make_response(
            jsonify(response_dict),
            200
        )
        return response


# api.add_resource(Index, "/")
api.add_resource(UploadedFiles, "/uploads")
api.add_resource(Upload_by_Id, "/uploads/<int:id>")
api.add_resource(TranscriptionResults, "/transcriptions")
api.add_resource(Transcription_by_Id, "/transcriptions/<int:id>")

if __name__ == '__main__':
    app.run(debug=True)
