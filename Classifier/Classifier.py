from ibm_watson import NaturalLanguageClassifierV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import json

authenticator = IAMAuthenticator('{apikey}')
natural_language_classifier = NaturalLanguageClassifierV1(
    authenticator=authenticator
)

natural_language_classifier.set_service_url('{url}')

response = natural_language_classifier.methodName(
    parameters,
    headers = {
        'Custom-Header': '{header_value}'
    })

natural_language_classifier.set_detailed_response(True)
response = natural_language_classifier.methodName(parameters)
# Access response from methodName
print(json.dumps(response.get_result(), indent=2))
# Access information in response headers
print(response.get_headers())
# Access HTTP response status
print(response.get_status_code())