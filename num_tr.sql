DROP FUNCTION web.num_tr(TEXT, INTEGER);

CREATE FUNCTION web.num_tr
(
  IN _input TEXT,
  IN _precision INTEGER
)
RETURNS TEXT
AS $$
DECLARE
  _input_number BIGINT;
  _output TEXT;
  _modifier TEXT;
BEGIN
  IF _input IS NULL OR _input = '' THEN
    RETURN '';
  END IF;

  _input_number = _input::BIGINT;
  _modifier = '';

  IF _input_number >= 1000 AND _input_number < 1000000 THEN
    _output := (round(_input_number / 1000., _precision))::TEXT;
    _modifier = 'k';
  ELSIF _input_number >= 1000000 AND _input_number < 1000000000 THEN
    _output := (round(_input_number / 1000000., _precision))::TEXT;
    _modifier = 'm';
  ELSIF _input_number >= 1000000000 AND _input_number < 1000000000000 THEN
    _output := (round(_input_number / 1000000000., _precision))::TEXT;
    _modifier = 'b';
  ELSIF _input_number >= 1000000000000 AND _input_number < 1000000000000000 THEN
    _output := (round(_input_number / 1000000000000., _precision))::TEXT;
    _modifier = 't';
  ELSIF _input_number >= 1000000000000000 AND _input_number < 1000000000000000000 THEN
    _output := (round(_input_number / 1000000000000000., _precision))::TEXT;
    _modifier = 'q';
  ELSE
    _output := _input;
  END IF;

  IF _modifier != '' THEN
    _output = trim(trailing '0' FROM _output);
    _output = trim(trailing '.' FROM _output);
    _output = _output || _modifier;
  END IF;

  return _output;
END;
$$ LANGUAGE plpgsql;