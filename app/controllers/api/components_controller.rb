require 'json'

class Api::ComponentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :find_component, only: %w(show update destroy)

  def index
    search_params = params.permit(:post_id)
    if params[:post_id]
      components = Component.where(:post_id => search_params[:post_id]).order(:ord)
    else
      components = Component.all
    end
    render json: { result: components.map { |component| to_dto(component) } }
  end

  def create
    component_params = params[:component].permit(:post_id, :component_type, :payload, :ord)
    # TODO(alx-v): Validate :payload
    component = Component.create(component_params)
    if component.persisted?
      render json: { result: component }, status: :created
    else
      render json: { error: compile_error(component.errors) }, status: :bad_request
    end
  end

  def show
    render json: { result: to_dto(@component) }
  end

  def update
    component_params = params[:component].permit(:component_type, :payload, :ord)
    @component.attributes = component_params
    if @component.save
      render json: { result: to_dto(@component) }
    else
      render json: { error: compile_error(@component.errors) }, status: :bad_request
    end
  end

  def destroy
    if @component.destroy
      render json: {}
    else
      render json: { error: compile_error(@component.errors) }, status: :bad_request
    end
  end

  private

  def find_component
    @component = Component.where({ id: params[:id] }).first
    unless @component
      render json: { error: 'Component not found' }, status: :not_found
    end
  end

  def to_dto(component)
    dto = component.attributes
    begin
      dto['payload'] = JSON.parse(dto['payload'])
    rescue JSON::ParserError
      # Ignored
    end
    dto
  end

  def compile_error(errors)
    errors.map { |e| "#{e.attribute}: #{e.message}" }.join("\n")
  end
end
